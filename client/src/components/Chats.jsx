// src/components/Chats.js
import React, { useEffect } from 'react';

const Chats = ({ activeConversation, chats }) => {
  useEffect(() => {
    // Fetch and update chat messages based on activeConversation
    // You can use your own logic here, e.g., fetching messages from an API
  }, [activeConversation]);

  return (
    <div className="flex-1 p-4">
      <h2 className="text-xl font-bold mb-4">{activeConversation.name} Chat</h2>
      <div className="overflow-y-auto h-96">
        {chats.map((chat) => (
          <div key={chat.id} className="mb-4">
            <strong>{chat.sender}: </strong>
            {chat.message}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Chats;
