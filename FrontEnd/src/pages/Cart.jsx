import { Link } from "react-router-dom";
import {
  decrementQuantity,
  incrementQuantity,
  removeCart,
  selectCart,
} from "../redux/cartSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Footer from "../components/post/Footer";

function Cart() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth.currentUser);
  const cart = useSelector(selectCart);

  const getTotal = () => {
    let totalQuantity = 0;
    let totalPrice = 0;
    cart.forEach((item) => {
      totalQuantity += item.quantity;
      totalPrice += item.quantity * item.price;
    });
    return { totalQuantity, totalPrice };
  };

  const formatPrice = (price) => {
    if (price === undefined || price === null) {
      return "";
    }
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".") + " VNĐ";
  };

  if (!auth) {
    navigate("/login");
    return (
      <div className="w-screen h-screen flex justify-center items-center">
        <p>
          Vui Lòng{" "}
          <a href="/login" className="text-cyan-500">
            {" "}
            đăng nhập{" "}
          </a>{" "}
          để tiếp tục...
        </p>
      </div>
    );
  }

  return (
    <div>
      <div className="pt-28">
        <div className="container mx-auto p-8">
          <h1 className="text-2xl font-bold mb-4">DANH SÁCH VẮC-XIN ĐÃ CHỌN</h1>
          <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
            {cart.length > 0 &&
              cart.map((item) => (
                <div key={`${item.vaccine_id}-${item.size}`} className="flex items-center justify-between mb-4">
                  <div className="flex items-center">
                    <img
                      src={item.image}
                      alt="Sản phẩm"
                      className="w-16 h-16 object-cover rounded"
                    />
                    <div className="ml-4">
                      <h2 className="text-lg font-semibold">
                        {item.name} - {item.size}
                      </h2>
                      <p className="text-gray-600"> Giá: {formatPrice(item.price)}</p>

                      <div className=" flex">
                        <p className="mt-1">Số Lượng:</p>
                        <button
                          onClick={() =>
                            dispatch(incrementQuantity(item.vaccine_id))
                          }
                          className=" text-xl mx-3 w-5 h-5 bg-slate-200 mt-1 inline-flex items-center justify-center"
                        >
                          +
                        </button>
                        <input
                          type="number"
                          value={item.quantity}
                          className="w-20"
                        />
                        <button
                          onClick={() =>
                            dispatch(decrementQuantity(item.vaccine_id))
                          }
                          className=" text-xl mx-3 mx-3 w-5 h-5 bg-slate-200 mt-1 inline-flex items-center justify-center"
                        >
                          -
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <button
                      onClick={() => dispatch(removeCart(item.vaccine_id))}
                      className="text-red-500 hover:text-red-700"
                    >
                      Xóa
                    </button>
                  </div>
                </div>
              ))}
          </div>

          Tính tổng giá trị giỏ hàng
          <div className="bg-white shadow-md rounded px-8 pt-6 pb-8">
            <h2 className="text-lg font-semibold mb-4">TỔNG TIỀN</h2>
            <div className="flex justify-between mb-2">
              <p className="text-gray-600">Tổng cộng:</p>
              <p className="font-semibold">{formatPrice(getTotal().totalPrice)}</p>
            </div>
          </div>

          {/* Nút tiếp tục thanh toán */}
          <div className="mt-8">
            <button className="bg-blue-500 text-white px-4 py-2 rounded-full hover:bg-blue-600">
              <Link to="/payvaccines">Tiếp tục thanh toán</Link>
            </button>
          </div>
        </div>
      </div>
      <Footer></Footer>
    </div>
  );
}

export default Cart;
