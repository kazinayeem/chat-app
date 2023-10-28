import React, { useState, useEffect } from "react";
import io from "socket.io-client";

const socket = io("http://localhost:3001");
function App() {
  const [id, setid] = useState("");
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  useEffect(() => {
    socket.on("connect", () => {
      setid(id);
    });
    socket.on("mess", (data) => {
      console.log(data);
      setMessages((prevMessages) => [...prevMessages, data]);
    });
    return () => {
      socket.disconnect();
    };
  }, [id]);

  const sendMessage = () => {
    socket.emit("message", message);

    setMessage("");
  };
  return (
    <div style={{ width: "100%" }}>
      <h1>HEllo world</h1>
      <div className="container mt-5">
        <h1 className="mb-4">Chat Application</h1>
        <div className="mb-3">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={
                socket.id === msg.id ? "alert alert-info" : "alert alert-danger"
              }
              style={{
                textAlign: socket.id === msg.id ? "left" : "right",
              }}
            >
              {msg.data}
            </div>
          ))}
        </div>
        <div className="input-group mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Type your message..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <div className="input-group-append">
            <button className="btn btn-primary" onClick={sendMessage}>
              Send
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
