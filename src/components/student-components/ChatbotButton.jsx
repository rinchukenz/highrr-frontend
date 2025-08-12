// ChatbotButton.jsx
import React from "react";
import { MessageCircle } from "lucide-react"; // or any icon
import chatbotIcon from "../../assets/HighrrAI.svg"; // Assuming you have an icon for the button

function ChatbotButton({ onClick }) {
  return (
    <>
      <img
        className="w-20 h-20 fixed cursor-pointer bottom-0 right-0 transition-all z-5"
        onClick={onClick}
        src={chatbotIcon}
        alt=""
      />
    </>
    // <button
    //   onClick={onClick}
    //   className="fixed bottom-4 right-4 bg-white transition-all z-50"
    // >
    //   {/* <MessageCircle size={24} /> */}
    //   <img className="fixed bottom-4 right-4 transition-all z-5" onClick={onClick} src={chatbotIcon} alt="" />
    // </button>
  );
}

export default ChatbotButton;
