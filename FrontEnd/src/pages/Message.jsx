import { useEffect, useState } from "react";
import io from "socket.io-client";
import SendIcon from "@mui/icons-material/Send";
const socket = io("http://localhost:3000");
import { useSelector } from "react-redux";

const Message = () => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState(
    localStorage.getItem("messages")
      ? JSON.parse(localStorage.getItem("messages"))
      : []
  );
  const auth = useSelector((state) => state.auth.currentUser);
  useEffect(() => {
    socket.on("message", (message) => {
      setMessages([...messages, message]);
    });
    // luu vao local storage
    localStorage.setItem("messages", JSON.stringify(messages));
  }, [messages]);

  const sendMessage = () => {
    if (message) {
      const newMessage = {
        text: message,
        role: "user",
        username: auth.username,
      };
      socket.emit("message", newMessage);
      setMessage("");
    }
  };

  /*Hàm Mở Form*/
  function moForm() {
    document.getElementById("myForm").style.display = "block";
  }
  /*Hàm Đóng Form*/
  function dongForm() {
    document.getElementById("myForm").style.display = "none";
  }

  if (!auth) return null;

  return (
    <div>
      <div className="fixed bottom-2 right-2 z-30">
        <button className="w-16 h-16 rounded-full bg-blue-500" onClick={moForm}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="w-14 h-14 mx-auto"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M20.25 8.511c.884.284 1.5 1.128 1.5 2.097v4.286c0 1.136-.847 2.1-1.98 2.193-.34.027-.68.052-1.02.072v3.091l-3-3c-1.354 0-2.694-.055-4.02-.163a2.115 2.115 0 01-.825-.242m9.345-8.334a2.126 2.126 0 00-.476-.095 48.64 48.64 0 00-8.048 0c-1.131.094-1.976 1.057-1.976 2.192v4.286c0 .837.46 1.58 1.155 1.951m9.345-8.334V6.637c0-1.621-1.152-3.026-2.76-3.235A48.455 48.455 0 0011.25 3c-2.115 0-4.198.137-6.24.402-1.608.209-2.76 1.614-2.76 3.235v6.226c0 1.621 1.152 3.026 2.76 3.235.577.075 1.157.14 1.74.194V21l4.155-4.155"
            />
          </svg>
        </button>
      </div>

      <div
        id="myForm"
        className="w-[300px] h-[410px] p-1 rounded-md shadow-lg fixed bottom-2 right-2 z-50 bg-white"
      >
        <div className="h-[50px] w-full bg-cyan-600 rounded-md text-white p-3 flex">
          <label className="text-xl inline-block">Poly Vaccines</label>
          <button
            onClick={dongForm}
            className="close-mess flex items-center justify-center w-10 h-10 cursor-pointer ml-12 pb-3"
          >
            <svg
              width="32"
              height="32"
              viewBox="0 0 32 32"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M0 16C0 7.16344 7.16344 0 16 0C24.8366 0 32 7.16344 32 16C32 24.8366 24.8366 32 16 32C7.16344 32 0 24.8366 0 16Z"
                fill="black"
                fillOpacity="0.04"
              ></path>
              <path
                d="M22.0278 15.0278C22.5647 15.0278 23 15.4631 23 16.0001C23 16.537 22.5647 16.9723 22.0278 16.9723L9.97222 16.9723C9.43528 16.9723 9 16.537 9 16.0001C9 15.4631 9.43528 15.0278 9.97222 15.0278L22.0278 15.0278Z"
                fill="black"
              ></path>
            </svg>
          </button>
        </div>
        <div className="box-chat h-[305px] w-full rounded-sm m-1 p-1 overflow-y-scroll">
          {messages.map((item) => {
            if (item.role === "user") {
              return (
                <div key={item._id} className="text-right mb-2">
                  <div className="bg-blue-200 rounded-md p-2 inline-block break-all">
                    {item.text}
                  </div>
                </div>
              );
            } else {
              return (
                <div key={item._id} className="text-left mb-2">
                  <div className="bg-gray-200 rounded-md p-2 inline-block break-all">
                    {item.text}
                  </div>
                </div>
              );
            }
          })}
        </div>

        <div className="mess-input">
          <div className="flex items-center gap-x-3 rounded-lg p-2 bg-gray-200">
            <div className="w-full">
              <input
                type="text"
                value={message}
                className="w-full outline-none bg-transparent text-lg font-medium"
                placeholder="Hãy nhập tin nhắn của bạn"
                onChange={(e) => setMessage(e.target.value)}
              />
            </div>
            <button onClick={sendMessage} className="">
              <SendIcon />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Message;
