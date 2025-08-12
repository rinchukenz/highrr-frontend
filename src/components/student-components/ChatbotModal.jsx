import React from "react";
import chatbotHeading from "../../assets/chatbot-heading-icon.svg";
import chatbotLogo from "../../assets/chatbot-logo.svg";
import chatbotIcon from "../../assets/chat-icon-center.svg";
import planeIcon from "../../assets/send-icon.svg";

function ChatbotModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="fixed bottom-19 right-9 w-80 bg-white border-[0.5px] rounded-xl z-50 flex flex-col">
      <div className="text-black px-4 flex justify-between items-center border-b">
        <div className="flex items-center gap-2">
          <img src={chatbotHeading} alt="" />
          <h3 className="font-bold">Highrr AI</h3>
        </div>
        <button onClick={onClose}>✖</button>
      </div>
      <div className="flex-1 p-3 overflow-y-auto text-sm">
        <p>Hello! How can I help you today? 😊</p>
      </div>
      <div className="flex items-center gap-3 p-2">
        <input
          type="text"
          placeholder="Type your message..."
          className="w-full px-3 py-2 border rounded-3xl text-sm"
        />
        <img className="bg-violet-500 p-2 w-9 h-9 rounded-full" src={planeIcon} alt="" />
      </div>
    </div>
  );
}

export default ChatbotModal;
