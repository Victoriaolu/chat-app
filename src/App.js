import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';

const socket = io('http://localhost:3000'); //  server URL
function App() {
  // State for storing messages and current message
  const [messages, setMessages] = useState([]);
  const [currentMessage, setCurrentMessage] = useState('');
  // Function to send a message
  const sendMessage = () => {
    if (currentMessage) {
      socket.emit('message', currentMessage);
      setCurrentMessage('');
    }
  };
  useEffect(() => {
    // Listen for incoming messages
    socket.on('message', (message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    });
  }, []);
  return (
    <div className="App">
      <div className="messages">
        {messages.map((message, index) => (
          <div key={index} className="message">
            {message}
          </div>
        ))}
      </div>
      <input
        type="text"
        placeholder="Type a message..."
        value={currentMessage}
        onChange={(e) => setCurrentMessage(e.target.value)}
      />
      <button onClick={sendMessage}>Send</button>
    </div>
  );
}
export default App;
