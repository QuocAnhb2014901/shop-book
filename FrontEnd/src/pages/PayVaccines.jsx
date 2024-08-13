import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { addOther } from "../redux/otherSlice";
import Paypal from "../components/Paypal";

function PayVaccines() {
  const auth = useSelector((state) => state.auth.currentUser);
  const cart = useSelector((state) => state.cart.cart);
  const dispatch = useDispatch();

  const getTotal = () => {
    let totalQuantity = 0;
    let totalPrice = 0;
    let totalPriceUsd = 0;
    cart.forEach((item) => {
      totalQuantity += item.quantity;
      totalPrice += item.quantity * item.price;
      totalPriceUsd = Math.round((totalPrice / 23000) * 100) / 100;
    });
    return { totalQuantity, totalPrice, totalPriceUsd };
  };

  const [username, setUsername] = useState(auth?.username || "");
  const [phone_number, setPhone_number] = useState(auth?.phone || "");
  const [address, setAddress] = useState(auth?.address || "");
  const [note, setNote] = useState("");
  const [status, setStatus] = useState("Đã thanh toán")
  const formatPrice = (price) => {
    if (price === undefined || price === null) {
      return "";
    }
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".") + " VNĐ";
  };

  const handlePay = () => {
    // Set status to "Chưa thanh toán" here


    const data = {
      username: username,
      phone_number: phone_number,
      address: address,
      note: note,
      cart: cart,
      status: "chưa thanh toán", // Pass the current status
    };
    dispatch(addOther(data));
  };
  return (
    <div>
      <div className="container mx-auto p-[150px]">
        <h1 className="text-2xl font-bold">THÔNG TIN NGƯỜI MUA</h1>
        <table className="w-full text-left rtl:text-right mb-2">
          <thead className="text-lg">
            <tr>
              <th>Tên vắc-xin</th>
              <th>Số lượng</th>
              <th>Giá</th>
              <th>Size</th>
            </tr>
          </thead>
          <tbody>
            {cart.map((item) => (
              <tr key={item.vaccine_id}>
                <td>{item.name}</td>
                <td className="pl-9">{item.quantity}</td>
                <td>{formatPrice(item.price)}</td>
                <td>{item.size}</td>
              </tr>
            ))}
            <tr>
              <td>
                <span className="font-semibold">Tổng</span>
              </td>
              <td>
                <span className="font-semibold pl-9">
                  {formatPrice(getTotal().totalPrice)}
                </span>
              </td>
            </tr>
          </tbody>
        </table>

        <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="name"
            >
              Họ và tên *
            </label>
            <input
              className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="name"
              type="text"
              placeholder="Họ và tên"
              onChange={(e) => setUsername(e.target.value)}
              value={username}
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="phone"
            >
              Số điện thoại *
            </label>
            <input
              className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="phone"
              type="tel"
              placeholder="Số điện thoại"
              name="phone_number"
              value={phone_number}
              onChange={(e) => setPhone_number(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="address"
            >
              Địa chỉ *
            </label>
            <input
              className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="address"
              type="text"
              placeholder="Địa chỉ"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="note"
            >
              Ghi Chú *
            </label>
            <textarea
              className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="note"
              type="text"
              placeholder=""
              required
              onChange={(e) => setNote(e.target.value)}
              value={note}
            />
          </div>

          <h2 className="text-2xl font-bold mb-4">CHỌN PHƯƠNG THỨC THANH TOÁN</h2>
          <div>
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="pay"
            >
              Hình Thức Thanh Toán *
            </label>
            <Paypal
              payload={{
                cart,
                username: username,
                phone_number: phone_number,
                address: address,
                note: note,
                userId: auth?._id,
                status: status,
              }}
              amount={getTotal().totalPriceUsd}
            />
          </div>
          <button
            onClick={handlePay}
            className="inline-flex items-center justify-center px-8 py-4 font-sans font-semibold tracking-wide text-white bg-blue-500 rounded-lg h-[60px]"
          >
            Thanh toán
          </button>
        </div>
      </div>
    </div>
  );
}

export default PayVaccines;
