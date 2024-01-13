// src/components/Chats.js
import React, { useEffect } from "react";

const Chats = ({ activeConversation, chats }) => {
  useEffect(() => {
    // Fetch and update chat messages based on activeConversation
    // You can use your own logic here, e.g., fetching messages from an API
  }, [activeConversation]);

  return (
    <div className="flex flex-col justify-between w-full p-4">
      <h2 className="text-xl font-bold mb-4">{activeConversation.name} </h2>
      <div className="overflow-y-auto h-96">
        {chats.map((chat) => (
          <div key={chat.id} className="mb-4">
            <strong>{chat.sender}: </strong>
            {chat.message}
          </div>
        ))}
      </div>
      <div className="  w-full flex justify-between gap-0 border border-green h-20 rounded-lg overflow-hidden ">
        <input
          type="text"
          placeholder="How can I help you?"
          className="w-4/5 h-full outline-none p-2"
        />{" "}
        <button className="bg-primary w-[80px] text-white ">Ask</button>
      </div>
    </div>
  );
};

export default Chats;
