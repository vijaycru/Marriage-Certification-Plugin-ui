import { MessageSquareMore } from "lucide-react";
import {FeedbackContainer} from "./index";


export const BotMessage = ({ value }: { value: string }) => {
  return (
    <div className="flex-col flex gap-1">
      <div className="flex-row flex gap-2 items-center">
        <MessageSquareMore className="text-blue-600" />
        <span className="text-xs">Zen Citizen Bot</span>
      </div>
      <div className="message-text response-text text-sm text-gray-800 bg-white px-6 rounded-lg text-left tracking-wide pb-4 pt-4 leading-[22px] font-normal">
        {value}
      </div>
      <FeedbackContainer />
    </div>
  );
};
