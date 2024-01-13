import React from "react";
import { Link, Outlet } from "react-router-dom";

import axios from "axios";

// src/App.js
import { useState } from 'react';
import { BrowserRouter as Router, Route , Routes , useParams} from 'react-router-dom';
import Conversations from '../components/Conversations';
import Chats from '../components/Chats';

const conversationsData = [
  { id: 1, name: 'Conversation 1' },
  { id: 2, name: 'Conversation 2' },
  // Add more conversations as needed
];

const chatsData = {
  1: [
    { id: 1, sender: 'User1', message: 'Hello!' },
    { id: 2, sender: 'User2', message: 'Hi there!' },
    // Add more messages as needed
  ],
  2: [
    { id: 1, sender: 'User1', message: 'How are you?' },
    { id: 2, sender: 'User2', message: `I'm good, thank you!` },
    // Add more messages as needed
  ],
  // Add more chats as needed
};

const ChatPage = () => {
  const [activeConversation, setActiveConversation] = useState(conversationsData[0].id);
  const { id } = useParams();
  if(id!=null){
    setActiveConversation(id);
  }
  return (

      <div className="flex h-screen">
        <h1>hii</h1>
        <Conversations conversations={conversationsData} setActiveConversation={setActiveConversation} />
            <Chats activeConversation={conversationsData.find(conv => conv.id === activeConversation)} chats={chatsData[activeConversation]} />

            <Chats activeConversation={conversationsData.find(conv => conv.id === activeConversation)} chats={chatsData[activeConversation]} />

    </div>
  );
};

export default ChatPage;
