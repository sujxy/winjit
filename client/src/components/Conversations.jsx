// src/components/Conversations.js
import React from 'react';

const Conversations = ({ conversations, setActiveConversation }) => {
  return (
    <div className="w-1/4 border-r p-4">
      <h2 className="text-xl font-bold mb-4">Conversations</h2>
      <ul>
        {conversations.map((conversation) => (
          <li
            key={conversation.id}
            className="cursor-pointer hover:bg-gray-200 p-2 rounded"
            onClick={() => setActiveConversation(conversation.id)}
          >
            {conversation.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Conversations;
