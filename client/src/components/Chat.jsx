import React, { useState, useEffect } from "react";
import "../styles/components/Chat.css";
import io from "socket.io-client";

const socket = io.connect("http://localhost:3000");

const Chat = () => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [activeUsers, setActiveUsers] = useState(0);

  useEffect(() => {
    socket.on("receive_message", (data) => {
      setMessages((prevMessages) => [...prevMessages, data]);
    });

    socket.on("active_users", (count) => {
      setActiveUsers(count);
    });

    return () => {
      socket.off("receive_message");
      socket.off("active_users");
    };
  }, []);

  const sendMessage = () => {
    if (message.trim() !== "") {
      socket.emit("send_message", message);
      setMessage("");
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      sendMessage();
    }
  };

  return (
    <div className="container-md">
      <div className="onl-status">
        <h4>Random chat - Be polite</h4>
        <p className="active-users">{activeUsers}</p>
      </div>
      <div className="chat-container">
        <div className="messages">
          {messages.map((msg, index) => (
            <p key={index}>
              <strong>{msg.user}:</strong> {msg.message}
            </p>
          ))}
        </div>
        <input
          placeholder="Message..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={handleKeyPress}
        />
        <button onClick={sendMessage}>Send</button>
      </div>
    </div>
  );
};

export default Chat;
