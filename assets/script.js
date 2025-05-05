const chatBody = document.querySelector(".chat-body");
const chatBox = document.querySelector(".chatbot-popup");
const messageInput = document.querySelector(".message-input");
const sendMessage = document.querySelector("#send-message");
const chatbotToggler = document.querySelector("#chatbot-toggler");
const closeChatbot = document.querySelector("#close-chatbot");
// API setup
const API_KEY = "AIzaSyCfDpgNwuF324t-LThIYqjz-UxhBqjynZs";
const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${API_KEY}`;
// Initialize user message and file data
const userData = {
  message: null,
};
let uniqueid = crypto.randomUUID();
// Store chat history
const chatHistory = [];
const initialInputHeight = messageInput.scrollHeight;
// Create message element with dynamic classes and return it
const createMessageElement = (content, ...classes) => {
  const div = document.createElement("div");
  div.classList.add("message", ...classes);
  div.innerHTML = content;
  return div;
};

const MessageElementWithThumbs = `<div class="feedback-container hidden"><div class="flex gap-4 ml-2 mt-1"><button class="hover:bg-white hover:rounded-2xl hover:text-[#dodoe2] p-1" id="thumbs-up-${uniqueid}"><img src="assets/svg/thumb-up.svg" /></button><button class="hover:bg-white hover:rounded-2xl hover:text-[#dodoe2] p-1" id="thumbs-down-${uniqueid}"><img src="assets/svg/thumb-down.svg" /></button></div></div>`;
// Generate bot response using API
const generateBotResponse = async (incomingMessageDiv) => {
  const messageElement = incomingMessageDiv.querySelector(".message-text");
  // Add user message to chat history
  chatHistory.push({
    role: "user",
    parts: [{ text: userData.message }],
  });
  // API request options
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      contents: chatHistory,
    }),
  };
  try {
    // Fetch bot response from API
    // const response = await fetch(API_URL, requestOptions);

    const response = await fetch(`${API_URL}`, requestOptions);
    const data = await response.json();
    if (!response.ok) throw new Error(data.error.message);
    // Extract and display bot's response text
    const apiResponseText = data.candidates[0].content.parts[0].text
      .replace(/\*\*(.*?)\*\*/g, "$1")
      .trim();
    messageElement.innerHTML = `${apiResponseText}`;

    // Add bot response to chat history
    chatHistory.push({
      role: "model",
      parts: [{ text: apiResponseText }],
    });
  } catch (error) {
    // Handle error in API response
    messageElement.innerText = error.message;
    messageElement.style.color = "#ff0000";
  } finally {
    // Reset user's file data, removing thinking indicator and scroll chat to bottom
    incomingMessageDiv.querySelector(".thinking-indicator").remove();
    const botMessage = incomingMessageDiv.querySelector(".response-text");
    const MessageThumbs = incomingMessageDiv.querySelector(
      ".feedback-container"
    );
    botMessage.classList.remove("hidden");
    MessageThumbs.classList.remove("hidden");
    chatBody.scrollTo({ top: chatBody.scrollHeight, behavior: "smooth" });
  }
};
// Handle outgoing user messages
const handleOutgoingMessage = (e) => {
  e.preventDefault();
  userData.message = messageInput.value.trim();
  messageInput.value = "";
  messageInput.dispatchEvent(new Event("input"));
  // Create and display user message
  const messageContent = `<div class="message-text message-text text-neutral-50 text-sm bg-[#013df5] p-3 rounded-lg w-10/12 ml-auto mt-5 tracking-wide leading-[22px]"></div>`;
  const outgoingMessageDiv = createMessageElement(
    messageContent,
    "user-message",
    "mt-20px"
  );
  outgoingMessageDiv.querySelector(".message-text").innerText =
    userData.message;
  chatBody.appendChild(outgoingMessageDiv);
  chatBody.scrollTo({ top: chatBody.scrollHeight, behavior: "smooth" });
  // Simulate bot response with thinking indicator after a delay
  setTimeout(() => {
    const messageContent = `<div class="flex-col flex gap-1">
    <div class="flex-row flex gap-2 items-center mt-5">
    <img src="assets/svg/logo.svg"/><span class="text-xs">Zen Citizen Bot</span></div><div class="thinking thinking-indicator ml-[35px]"><p>thinking...</p></div><div class="message-text response-text text-sm text-gray-800 bg-white px-7 rounded-lg text-left tracking-wide pb-4 pt-7 leading-[22px] font-normal hidden"></div>${MessageElementWithThumbs}</div>`;
    const incomingMessageDiv = createMessageElement(
      messageContent,
      "bot-message"
    );

    chatBody.appendChild(incomingMessageDiv);
    chatBody.scrollTo({ top: chatBody.scrollHeight, behavior: "smooth" });
    generateBotResponse(incomingMessageDiv);
  }, 600);
};
// Adjust input field height dynamically
messageInput.addEventListener("input", (e) => {
  messageInput.style.height = `${initialInputHeight}px`;
  const userMessage = e.target.value.trim();

  if (userMessage.length >= 1) {
    document.getElementById("microphone").classList.add("hidden");
    document.getElementById("send-message").classList.remove("hidden");
  } else {
    document.getElementById("microphone").classList.remove("hidden");
    document.getElementById("send-message").classList.add("hidden");
  }
  // messageInput.style.height = `${messageInput.scrollHeight}px`;
  // document.querySelector(".chat-form").style.borderRadius =
  //   messageInput.scrollHeight > initialInputHeight ? "15px" : "32px";
});
// Handle Enter key press for sending messages
messageInput.addEventListener("keydown", (e) => {
  const userMessage = e.target.value.trim();
  if (
    e.key === "Enter" &&
    !e.shiftKey &&
    userMessage
    // window.innerWidth > 768
  ) {
    handleOutgoingMessage(e);
  }
});
sendMessage.addEventListener("click", (e) => handleOutgoingMessage(e));
closeChatbot.addEventListener("click", () => chatBox.classList.add("hidden"));
chatbotToggler.addEventListener("click", () =>
  chatBox.classList.toggle("hidden")
);
