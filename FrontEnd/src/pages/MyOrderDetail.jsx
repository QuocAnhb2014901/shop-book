import React, { useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const MyOrderDetail = () => {
  const { id } = useParams();
  const [other, setOther] = React.useState([]);
  useEffect(() => {
    axios
      .get(`http://localhost:3000/api/v1/otherVaccine/${id}`)
      .then((res) => {
        setOther(res.data.otherVaccine);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [id]);
  let totalPrice = 0;
  other?.cart?.forEach((item) => {
    totalPrice += item.price * item.quantity;
  });
  return (
    <div className="content-wrapper">
      <div className="content-header p-4">
        <h1 className="text-2xl font-semibold mb-4">
          Chi tiết đơn hàng #{other.id}
        </h1>
        <div className="bg-white p-6 rounded-lg shadow-md mx-auto">
          {other?.cart?.map((item) => (
            <div key={item._id} className="flex items-center gap-4 mb-4">
              <div className="w-16 h-16">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-cover rounded-lg"
                />
              </div>
              <div className="flex-1">
                <p className="text-lg font-semibold">{item.name}</p>
                <p className="text-lg font-semibold">
                  Giá:{" "}
                  {new Intl.NumberFormat("vi-VN", {
                    style: "currency",
                    currency: "VND",
                  }).format(item.price)}{" "}
                </p>
              </div>
              <div className="flex-1">
                <p className="text-lg font-semibold">
                  Số lượng: {item.quantity}
                </p>
              </div>
            </div>
          ))}
          <div className="container-fluid mb-4">
            <p className="text-lg font-semibold">
              {new Intl.NumberFormat("vi-VN", {
                style: "currency",
                currency: "VND",
              }).format(totalPrice)}
            </p>
            <p className="text-lg font-semibold">Ghi chú: {other.note}</p>
          </div>
        </div>
        <a href="/my-order">Quay lại</a>
      </div>
    </div>
  );
};

export default MyOrderDetail;
