import { useState } from "react";
import ReactQuill from "react-quill";

const MessageToPhone = () => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [message, setMessage] = useState("");

  const handlePhoneChange = (event) => {
    setPhoneNumber(event.target.value);
  };

  const handleMessageChange = (value) => {
    setMessage(value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const cleanedMessage = stripHtmlTags(message); // Hàm để loại bỏ các thẻ HTML
      const response = await fetch('http://localhost:3000/send-sms', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ phoneNumber, message: cleanedMessage }), // Sử dụng nội dung đã được xử lý
      });

      const data = await response.json();
      if (data.success) {
        alert(data.message);
      } else {
        alert("Đã xảy ra lỗi khi gửi tin nhắn.");
      }
    } catch (error) {
      console.error(error);
      alert("Đã xảy ra lỗi khi gửi tin nhắn.");
    }
  };

  // Hàm loại bỏ các thẻ HTML từ nội dung
  const stripHtmlTags = (html) => {
    let doc = new DOMParser().parseFromString(html, 'text/html');
    return doc.body.textContent || "";
  };

  return (
    <div className="flex content-wrapper">


      <form
        autoComplete="off"
        className="container-fluid w-full h-max max-w-[600px] mt-20 mx-auto p-10 bg-white rounded-lg shadow"
        aria-label="signup-form"
        onSubmit={handleSubmit}
      >
        <h2 className="mb-10 text-3xl font-bold text-center">Gửi Tin Nhắn Về Điện Thoại</h2>
        <div className="flex flex-col items-start mb-5 gap-y-3">
          <label className="text-lg font-medium cursor-pointer">
            Số Điện Thoại
          </label>
          <input
            id="phone"
            type="text"
            value={phoneNumber}
            onChange={handlePhoneChange}
            className="w-full p-4 bg-transparent border border-gray-200 rounded-lg outline-none"
            placeholder="Enter your phone..."
          />
        </div>
        <div className="flex flex-col items-start mb-5 gap-y-3">
          <label className="text-lg font-medium cursor-pointer">
            Nội Dung
          </label>
          <ReactQuill
            className="h-[130px] w-full pb-10"
            theme="snow"
            value={message}
            onChange={handleMessageChange}
            id="content"
          />
        </div>
        <button
          type="submit"
          className="inline-flex w-full items-center justify-center px-8 py-4 font-sans font-semibold tracking-wide text-white bg-blue-500 rounded-lg h-[60px]"
        >
          Gửi
        </button>
      </form>
    </div>
  );
};

export default MessageToPhone;