const chatBody = document.querySelector(".chat-body");
const messageInput = document.querySelector(".message-input");
const sendMessage = document.querySelector("#send-message");
const chatbotToggler = document.querySelector("#chatbot-toggler");
const closeChatbot = document.querySelector("#close-chatbot");
// API setup
const API_KEY = "dummy-api";
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
// Create message element with dynamic classes and return it with thumbs
const createMessageElementWithThumbs = (content, ...classes) => {
  const div = document.createElement("div");
  div.classList.add("feedback-container", ...classes);
  // div.innerHTML = `<button class="thumb-btn" id="thumbs-up-${uniqueid}">
  //               <svg fill="#ffffff" height="25px" width="25px" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="-1.45 -1.45 31.95 31.95" xml:space="preserve" stroke="#ffffff" stroke-width="0.00029046000000000003" transform="matrix(1, 0, 0, 1, 0, 0)"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round" stroke="#000000" stroke-width="0.5809200000000001"> <g> <path d="M25.334,17.932c0,1.291-1.193,2.104-2.486,2.104h-0.01c0.965,0.166,2.111,1.331,2.111,2.462 c0,1.243-1.184,2.019-2.43,2.019h-1.072c0.844,0.243,1.977,1.375,1.977,2.462c0,1.27-1.191,2.067-2.459,2.067H10.156 c-3.56,0-6.443-2.887-6.443-6.447c0,0,0-6.872,0-6.88c0-2.522,1.395-5.189,3.59-6.042c1.711-1.126,5.15-3.133,5.883-6.85 c0-1.449,0-2.809,0-2.809s4.807-0.52,4.807,3.999c0,5.322-3.348,6.186-0.686,6.314h3.98c1.406,0,2.621,1.37,2.621,2.779 c0,1.217-1.154,2.006-2.119,2.254h1.059C24.141,15.365,25.334,16.642,25.334,17.932z"></path> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> </g> </g><g id="SVGRepo_iconCarrier"> <g> <path d="M25.334,17.932c0,1.291-1.193,2.104-2.486,2.104h-0.01c0.965,0.166,2.111,1.331,2.111,2.462 c0,1.243-1.184,2.019-2.43,2.019h-1.072c0.844,0.243,1.977,1.375,1.977,2.462c0,1.27-1.191,2.067-2.459,2.067H10.156 c-3.56,0-6.443-2.887-6.443-6.447c0,0,0-6.872,0-6.88c0-2.522,1.395-5.189,3.59-6.042c1.711-1.126,5.15-3.133,5.883-6.85 c0-1.449,0-2.809,0-2.809s4.807-0.52,4.807,3.999c0,5.322-3.348,6.186-0.686,6.314h3.98c1.406,0,2.621,1.37,2.621,2.779 c0,1.217-1.154,2.006-2.119,2.254h1.059C24.141,15.365,25.334,16.642,25.334,17.932z"></path> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> </g> </g></svg>
  //             </button>
  //             <button class="thumb-btn" id="thumbs-down-${uniqueid}">
  //               <svg fill="#ffffff" height="25px" width="25px" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="-1.45 -1.45 31.95 31.95" xml:space="preserve" stroke="#ffffff" stroke-width="0.00029046000000000003" transform="matrix(-1, 0, 0, -1, 0, 0)"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round" stroke="#000000" stroke-width="0.5809200000000001"> <g> <path d="M25.334,17.932c0,1.291-1.193,2.104-2.486,2.104h-0.01c0.965,0.166,2.111,1.331,2.111,2.462 c0,1.243-1.184,2.019-2.43,2.019h-1.072c0.844,0.243,1.977,1.375,1.977,2.462c0,1.27-1.191,2.067-2.459,2.067H10.156 c-3.56,0-6.443-2.887-6.443-6.447c0,0,0-6.872,0-6.88c0-2.522,1.395-5.189,3.59-6.042c1.711-1.126,5.15-3.133,5.883-6.85 c0-1.449,0-2.809,0-2.809s4.807-0.52,4.807,3.999c0,5.322-3.348,6.186-0.686,6.314h3.98c1.406,0,2.621,1.37,2.621,2.779 c0,1.217-1.154,2.006-2.119,2.254h1.059C24.141,15.365,25.334,16.642,25.334,17.932z"></path> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> </g> </g><g id="SVGRepo_iconCarrier"> <g> <path d="M25.334,17.932c0,1.291-1.193,2.104-2.486,2.104h-0.01c0.965,0.166,2.111,1.331,2.111,2.462 c0,1.243-1.184,2.019-2.43,2.019h-1.072c0.844,0.243,1.977,1.375,1.977,2.462c0,1.27-1.191,2.067-2.459,2.067H10.156 c-3.56,0-6.443-2.887-6.443-6.447c0,0,0-6.872,0-6.88c0-2.522,1.395-5.189,3.59-6.042c1.711-1.126,5.15-3.133,5.883-6.85 c0-1.449,0-2.809,0-2.809s4.807-0.52,4.807,3.999c0,5.322-3.348,6.186-0.686,6.314h3.98c1.406,0,2.621,1.37,2.621,2.779 c0,1.217-1.154,2.006-2.119,2.254h1.059C24.141,15.365,25.334,16.642,25.334,17.932z"></path> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> </g> </g></svg>
  //             </button>`;
  return div;
};
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

    const response = await fetch(
      "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=AIzaSyCfDpgNwuF324t-LThIYqjz-UxhBqjynZs",
      requestOptions
    );
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
    console.log(error);
    messageElement.innerText = error.message;
    messageElement.style.color = "#ff0000";
  } finally {
    // Reset user's file data, removing thinking indicator and scroll chat to bottom
    incomingMessageDiv.querySelector(".thinking-indicator").remove();
    const botMessage = incomingMessageDiv.querySelector(".response-text");
    console.log(botMessage.classList.remove("hidden"));
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
               <svg
                fill="#013df5"
                version="1.1"
                id="Capa_1"
                width="25"
                height="25"
                xmlns="http://www.w3.org/2000/svg"
                xmlns:xlink="http://www.w3.org/1999/xlink"
                viewBox="-15.03 -15.03 73.00 73.00"
                xml:space="preserve"
                stroke="#013df5"
                stroke-width="1.71752"
              >
                <g id="SVGRepo_bgCarrier" stroke-width="0">
                  <rect
                    x="-15.03"
                    y="-15.03"
                    width="73.00"
                    height="73.00"
                    rx="36.5"
                    fill="#fff"
                    strokewidth="0"
                  ></rect>
                </g>
                <g
                  id="SVGRepo_tracerCarrier"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                ></g>
                <g id="SVGRepo_iconCarrier">
                  <g>
                    <path
                      d="M38.438,2.676H4.5c-2.485,0-4.5,2.016-4.5,4.5v22.238c0,2.484,2.015,4.5,4.5,4.5h25.783l4.953,5.012 c0.861,0.872,2.021,1.336,3.201,1.336c0.574,0,1.156-0.109,1.709-0.338c1.688-0.693,2.791-2.338,2.791-4.162V7.176 C42.938,4.692,40.924,2.676,38.438,2.676z M11.094,23.969c-2.691,0-4.875-2.184-4.875-4.875c0-2.691,2.184-4.875,4.875-4.875 s4.875,2.184,4.875,4.875C15.969,21.785,13.785,23.969,11.094,23.969z M21.469,23.969c-2.691,0-4.875-2.184-4.875-4.875 c0-2.691,2.184-4.875,4.875-4.875s4.875,2.184,4.875,4.875C26.344,21.785,24.16,23.969,21.469,23.969z M31.844,23.969 c-2.69,0-4.875-2.184-4.875-4.875c0-2.691,2.185-4.875,4.875-4.875c2.691,0,4.875,2.184,4.875,4.875 C36.719,21.785,34.535,23.969,31.844,23.969z"
                    ></path>
                  </g>
                </g>
              </svg>
              <span class="text-xs">Zen Citizen Bot</span>
            </div>
            <div class="thinking thinking-indicator ml-[35px]">
            <p>thinking...</p>
            </div>
            <div class="message-text response-text text-sm text-gray-800 bg-white px-7 rounded-lg text-left tracking-wide pb-4 pt-7 leading-[22px] font-normal hidden">
            </div>
          </div>`;
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
messageInput.addEventListener("input", () => {
  messageInput.style.height = `${initialInputHeight}px`;
  messageInput.style.height = `${messageInput.scrollHeight}px`;
  document.querySelector(".chat-form").style.borderRadius =
    messageInput.scrollHeight > initialInputHeight ? "15px" : "32px";
});
// Handle Enter key press for sending messages
messageInput.addEventListener("keydown", (e) => {
  const userMessage = e.target.value.trim();
  if (
    e.key === "Enter" &&
    !e.shiftKey &&
    userMessage &&
    window.innerWidth > 768
  ) {
    handleOutgoingMessage(e);
  }
});
// Initialize emoji picker and handle emoji selection
const picker = new EmojiMart.Picker({
  theme: "light",
  skinTonePosition: "none",
  previewPosition: "none",
  onEmojiSelect: (emoji) => {
    const { selectionStart: start, selectionEnd: end } = messageInput;
    messageInput.setRangeText(emoji.native, start, end, "end");
    messageInput.focus();
  },
  onClickOutside: (e) => {
    if (e.target.id === "emoji-picker") {
      document.body.classList.toggle("show-emoji-picker");
    } else {
      document.body.classList.remove("show-emoji-picker");
    }
  },
});
document.querySelector(".chat-form").appendChild(picker);
sendMessage.addEventListener("click", (e) => handleOutgoingMessage(e));
closeChatbot.addEventListener("click", () =>
  document.body.classList.remove("show-chatbot")
);
chatbotToggler.addEventListener("click", () =>
  document.body.classList.toggle("show-chatbot")
);

// <div class="feedback-container">
//               <button class="thumb-btn" id="thumbs-up-${uniqueid}">
//                 <svg fill="#ffffff" height="25px" width="25px" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="-1.45 -1.45 31.95 31.95" xml:space="preserve" stroke="#ffffff" stroke-width="0.00029046000000000003" transform="matrix(1, 0, 0, 1, 0, 0)"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round" stroke="#000000" stroke-width="0.5809200000000001"> <g> <path d="M25.334,17.932c0,1.291-1.193,2.104-2.486,2.104h-0.01c0.965,0.166,2.111,1.331,2.111,2.462 c0,1.243-1.184,2.019-2.43,2.019h-1.072c0.844,0.243,1.977,1.375,1.977,2.462c0,1.27-1.191,2.067-2.459,2.067H10.156 c-3.56,0-6.443-2.887-6.443-6.447c0,0,0-6.872,0-6.88c0-2.522,1.395-5.189,3.59-6.042c1.711-1.126,5.15-3.133,5.883-6.85 c0-1.449,0-2.809,0-2.809s4.807-0.52,4.807,3.999c0,5.322-3.348,6.186-0.686,6.314h3.98c1.406,0,2.621,1.37,2.621,2.779 c0,1.217-1.154,2.006-2.119,2.254h1.059C24.141,15.365,25.334,16.642,25.334,17.932z"></path> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> </g> </g><g id="SVGRepo_iconCarrier"> <g> <path d="M25.334,17.932c0,1.291-1.193,2.104-2.486,2.104h-0.01c0.965,0.166,2.111,1.331,2.111,2.462 c0,1.243-1.184,2.019-2.43,2.019h-1.072c0.844,0.243,1.977,1.375,1.977,2.462c0,1.27-1.191,2.067-2.459,2.067H10.156 c-3.56,0-6.443-2.887-6.443-6.447c0,0,0-6.872,0-6.88c0-2.522,1.395-5.189,3.59-6.042c1.711-1.126,5.15-3.133,5.883-6.85 c0-1.449,0-2.809,0-2.809s4.807-0.52,4.807,3.999c0,5.322-3.348,6.186-0.686,6.314h3.98c1.406,0,2.621,1.37,2.621,2.779 c0,1.217-1.154,2.006-2.119,2.254h1.059C24.141,15.365,25.334,16.642,25.334,17.932z"></path> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> </g> </g></svg>
//               </button>
//               <button class="thumb-btn" id="thumbs-down-${uniqueid}">
//                 <svg fill="#ffffff" height="25px" width="25px" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="-1.45 -1.45 31.95 31.95" xml:space="preserve" stroke="#ffffff" stroke-width="0.00029046000000000003" transform="matrix(-1, 0, 0, -1, 0, 0)"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round" stroke="#000000" stroke-width="0.5809200000000001"> <g> <path d="M25.334,17.932c0,1.291-1.193,2.104-2.486,2.104h-0.01c0.965,0.166,2.111,1.331,2.111,2.462 c0,1.243-1.184,2.019-2.43,2.019h-1.072c0.844,0.243,1.977,1.375,1.977,2.462c0,1.27-1.191,2.067-2.459,2.067H10.156 c-3.56,0-6.443-2.887-6.443-6.447c0,0,0-6.872,0-6.88c0-2.522,1.395-5.189,3.59-6.042c1.711-1.126,5.15-3.133,5.883-6.85 c0-1.449,0-2.809,0-2.809s4.807-0.52,4.807,3.999c0,5.322-3.348,6.186-0.686,6.314h3.98c1.406,0,2.621,1.37,2.621,2.779 c0,1.217-1.154,2.006-2.119,2.254h1.059C24.141,15.365,25.334,16.642,25.334,17.932z"></path> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> </g> </g><g id="SVGRepo_iconCarrier"> <g> <path d="M25.334,17.932c0,1.291-1.193,2.104-2.486,2.104h-0.01c0.965,0.166,2.111,1.331,2.111,2.462 c0,1.243-1.184,2.019-2.43,2.019h-1.072c0.844,0.243,1.977,1.375,1.977,2.462c0,1.27-1.191,2.067-2.459,2.067H10.156 c-3.56,0-6.443-2.887-6.443-6.447c0,0,0-6.872,0-6.88c0-2.522,1.395-5.189,3.59-6.042c1.711-1.126,5.15-3.133,5.883-6.85 c0-1.449,0-2.809,0-2.809s4.807-0.52,4.807,3.999c0,5.322-3.348,6.186-0.686,6.314h3.98c1.406,0,2.621,1.37,2.621,2.779 c0,1.217-1.154,2.006-2.119,2.254h1.059C24.141,15.365,25.334,16.642,25.334,17.932z"></path> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> </g> </g></svg>
//               </button>
//             </div>`;
