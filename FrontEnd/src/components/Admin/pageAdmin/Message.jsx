import { useEffect, useState } from "react";
import { Card, CardHeader } from "@material-tailwind/react";
import SendIcon from "@mui/icons-material/Send";
import io from "socket.io-client";
import { Link } from "react-router-dom";

const socket = io("http://localhost:3000");

const Message = () => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState(
    localStorage.getItem("messages")
      ? JSON.parse(localStorage.getItem("messages"))
      : []
  );

  useEffect(() => {
    socket.on("message", (message) => {
      setMessages([...messages, message]);
    });
    // luu vao local storage
    localStorage.setItem("messages", JSON.stringify(messages));
  }, [messages]);

  const sendMessage = () => {
    if (message) {
      const newMessage = { text: message, role: "admin", timestamp: Date.now() };
      socket.emit("message", newMessage);
      console.log(newMessage);
      setMessage("");
    }
  };
  
  return (
    <div className="content-wrapper flex h-screen ">
      <Card className="w-full ml-4 p-4">
        <CardHeader className="content-header mb-4 w-full rounded-md">
          <div className="p-4">
            <div className="mess-title ">
              <h1 className="text-2xl font-bold text-gray-800">
                Tư Vấn Trực Tiếp
              </h1>
            </div>
            <div className="">
              <Link to="/messToPhone">
                {/* <button className="rounded-lg font-medium bg-blue-100 text-blue-500 hover:bg-slate-200 px-6 py-3 mt-[-39px] float-right">
                  Nhắn tin qua số điện thoại
                </button> */}
              </Link>
            </div>
          </div>
        </CardHeader>
        <div className="container-fluid chat flex">
          <div className="list-user w-64 bg-slate-400 rounded-r-lg shadow-lg p-4">
            <h2 className="text-white text-lg font-semibold mb-4">
              Người Dùng
            </h2>
            <h1 className="ml-2 text-[25px]">
              {localStorage.getItem("messages")
                ? JSON.parse(localStorage.getItem("messages"))[0]?.username
                : ""}
            </h1>
          </div>
          <div className="message-box flex-grow ml-4 p-4">
            <div className="chat-window h-96 max-h-96 overflow-y-auto bg-white rounded-lg shadow-lg p-4">
              {messages.map((item, index) => {
                const formattedTime = new Date(item.timestamp).toLocaleString();
                if (item.role === "user") {
                  return (
                    <div key={index} className="flex justify-start mb-2">
                      <div className="bg-slate-300 text-black rounded-md p-2">
                        {item.text}
                        
                      </div>
                    </div>
                  );
                } else {
                  return (
                    <div key={index} className="flex justify-end mb-2">
                      <div className="bg-blue-300 text-black rounded-md p-2">
                        {item.text}<br/ >
                        <small>{formattedTime}</small> 
                      </div>
                    </div>
                  );
                }
              })}
            </div>
            <div className="chat-input flex mt-4">
              <input
                onChange={(e) => setMessage(e.target.value)}
                type="text"
                value={message}
                placeholder="Enter your message"
                className="flex-grow rounded-lg py-2 px-4 outline-none border border-gray-300 focus:border-cyan-500"
              />
              <button
                onClick={sendMessage}
                className="bg-cyan-600 text-white py-2 px-4 rounded-lg ml-2 hover:bg-cyan-700"
              >
                <SendIcon />
              </button>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default Message;
