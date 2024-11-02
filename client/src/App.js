import React, { useEffect, useState } from 'react'; // Combined import statement
import io from 'socket.io-client';

const socket = io();

function App() {
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        // Listen for incoming messages
        socket.on('receiveMessage', (msg) => {
            setMessages((prevMessages) => [...prevMessages, msg]);
        });

        // Cleanup the effect
        return () => {
            socket.off('receiveMessage');
        };
    }, []);

    const sendMessage = (e) => {
        e.preventDefault();
        if (message) {
            socket.emit('sendMessage', message); // Send message to server
            setMessage(''); // Clear input field
        }
    };

    return (
        <div>
            <h1>Chat Application</h1>
            <div>
                {messages.map((msg, index) => (
                    <div key={index}>{msg}</div>
                ))}
            </div>
            <form onSubmit={sendMessage}>
                <input
                    type="text"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Type your message..."
                />
                <button type="submit">Send</button>
            </form>
        </div>
    );
}

export default App;
