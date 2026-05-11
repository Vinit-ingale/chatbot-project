import { useState, useEffect } from 'react'
import { ChatInput } from './components/ChatInput'
import ChatMessages from './components/ChatMessages'
import { Chatbot } from 'supersimpledev';
import './App.css'

function App (){ 
      const [chatMessages,setChatMessages] =  useState([])
     
    //const [chatMessages, setChatMessages]=array;
    //const chatMessages = array[0];
    //const setChatMessages = array[1];

    useEffect(()=>{
      Chatbot.addResponses({
        "good morning": "good morning how are you",
        "give me a unique id": ()=>{return `Sure! Here's a unique ID: ${crypto.randomUUID()}`;}
      }

      )
    },[])

    return (
   <div className="app-container">
    {
        chatMessages.length===0 &&(
        <p className="welcome-message">welcome to the chatbot project!1 Send a message using the textbox below </p>
        )
       }
      
      <ChatMessages 
       chatMessages={chatMessages}
      />
      <ChatInput
      chatMessages={chatMessages}
      setChatMessages={setChatMessages}
      time={chatMessages.time}
      
      />
       
      </div>
    )
   }

export default App
