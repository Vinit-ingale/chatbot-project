 import dayjs from 'dayjs';
 import { useState } from 'react';
 import { Chatbot } from 'supersimpledev'
 import LoadingSpinner from '../assets/loading-spinner.gif'
 import './ChatInput.css'

 
 export function ChatInput({chatMessages,setChatMessages}){
      const [inputText,setInputText]=useState('');
      const [isLoading,setIsLoading] = useState(false);

      
     function saveInputText(event){
        setInputText(event.target.value);
     }
     async function sendMessage(){

      if(isLoading || inputText === ''){
        return;
      }

      setIsLoading(true);

        const newChatMessages=[
        ...chatMessages,
        {
          sender:'user',
          message:inputText,
          id:crypto.randomUUID(),
          time: dayjs().valueOf()
        }
      ]

         setChatMessages([  
           ...newChatMessages,
            // This creates a temporary Loading... message.
            // Because we don't save this message in newChatMessages,
            // it will be remove later, when we add the response.
            {
              message: <img src={LoadingSpinner} className="loading-spinner"></img>,
              sender: 'robot',
              id: crypto.randomUUID()
            }]);

      const response = await Chatbot.getResponseAsync(inputText)
      
      setChatMessages([
        ...newChatMessages,
        {
          sender:'robot',
          message:response,
          id:crypto.randomUUID(),
          time: dayjs().valueOf()
        }
      ]);

     

      setInputText('')
      setIsLoading(false);
      }

      const time = dayjs().format('hh:mm A')
       const handleKeyDown= ()=>{
        if(event.key==='Enter'){
         
          sendMessage()
          console.log(time)
        }
        if(event.key === 'Escape'){
    
          setInputText('')
        }

      }
        

    return (
        < div className="chat-input-container">
        <input 
          placeholder="send a message to chatbot" 
          size="30"
          onChange={saveInputText}
          value={inputText}
          onKeyDown={handleKeyDown}
          className="chat-input"
         />
        <button 
          onClick={sendMessage}  
          className="send-button"
          >Send</button>
        </div>
    );
   }