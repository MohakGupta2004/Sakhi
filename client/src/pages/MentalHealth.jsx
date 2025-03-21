import React, { useEffect, useState } from 'react';
import { Send } from 'lucide-react';
import '../styles/chat.css';
import api from '../api';
import { initializeSocket, receiveMessage, sendMessage } from '../utils/socket';

const MentalHealth = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [user, setUser] = useState('');

  useEffect(() => {
    api.get('/auth/profile')
      .then((result) => {
        console.log("User Email:", result.data.message.email);
        setUser(result.data.message.email);
      })
      .catch((err) => console.log("Error fetching user:", err));
  }, []);

  useEffect(() => {
    if (!user) return;
    
    initializeSocket(user);

    receiveMessage("mentalhealth:message", (data) => {
      console.log("Received AI response:", data);
      setMessages((prev) => [
        ...prev,
        {
          id: prev.length + 1,
          text: JSON.parse(data.message).response,
          sender: data.sender,
          name: data.sender === user ? "me" : "others",
        },
      ]);
    });
  }, [user]); // Ensure socket initializes only when `user` is set.

  const handleSend = (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage = {
      id: messages.length + 1,
      text: input,
      sender: user,
      name: "me",
    };

    setMessages([...messages, userMessage]);

    sendMessage("mentalhealth:message", { message: input, sender: user });

    setInput(""); // Reset input field
  };

  return (
    <div className="chat-container">
      <div className="chat-header">
        <h1>Mental Health Support</h1>
        <p>A safe space to share your thoughts</p>
      </div>

      <div className="messages-container">
        {messages.map((message, index) => (
          <div 
            key={index} 
            className={`message ${message.name === 'me' ? 'user-message' : 'assistant-message'}`}
          >
            <div className="message-bubble">
              {message.text} {/* Fixed from message.content to message.text */}
            </div>
          </div>
        ))}
      </div>

      <form className="input-form" onSubmit={handleSend}>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type your message here..."
          className="message-input"
        />
        <button type="submit" className="send-button">
          <Send size={20} />
        </button>
      </form>
    </div>
  );
};

export default MentalHealth;
