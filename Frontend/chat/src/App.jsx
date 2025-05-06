// Frontend/src/App.js
import { useEffect, useState } from "react";
import { io } from "socket.io-client";

const socket = io("http://localhost:3000");

function App() {
  const [message, setMessage] = useState("");
  const [chat, setChat] = useState([]);

  useEffect(() => {
    socket.on("chat message", (msg) => {
      setChat((prev) => [...prev, msg]);
    });

    return () => {
      socket.off("chat message");
    };
  }, []);

  const sendMessage = () => {
    if (message.trim() !== "") {
      socket.emit("chat message", message);
      setMessage("");
    }
  };

  return (
    <div>
      <h2>Chat</h2>
      <div style={{ height: 300, overflowY: "scroll", border: "1px solid black" }}>
        {chat.map((msg, i) => (
          <div key={i}>{msg}</div>
        ))}
      </div>
      <input
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Type something"
      />
      <button onClick={sendMessage}>Send</button>
    </div>
  );
}

export default App;
