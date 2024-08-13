import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getVaccineById } from "../redux/vaccineSlice";
import axios from "axios";
import {
  addComment,
  deleteCommentByAuthor,
  getCommentByVaccineId,
} from "../redux/commentSlice";
import { addToCart } from "../redux/cartSlice";
import Footer from "../components/post/Footer";
import Swal from "sweetalert2";

function VaccinesDetail() {
  const [comment, setComment] = useState("");
  const { id } = useParams();
  const dispatch = useDispatch();
  const vaccine = useSelector((state) => state.vaccine.vaccine);
  const auth = useSelector((state) => state.auth);
  const userId = auth.currentUser?._id;
  const [selectedSize, setSelectedSize] = useState("");
  const [error, setError] = useState("");

  const commentList = useSelector((state) => state.comment.comment);

  useEffect(() => {
    dispatch(getVaccineById(id));
    dispatch(getCommentByVaccineId(id));
  }, [id, dispatch, commentList.length]);

  const handleSelectSize = (size) => {
    setSelectedSize(size);
    setError(""); // Clear any previous error when a size is selected
  };

  const navigate = useNavigate();

  const handleAddToCart = () => {
    if (!selectedSize) {
      setError("Vui lòng chọn kích cỡ trước khi thêm vào giỏ hàng.");
      return;
    }

    const data = {
      user_id: userId,
      vaccine_id: id,
      image: vaccine.image,
      name: vaccine.name,
      price: vaccine.price,
      description: vaccine.description,
      size: selectedSize,
    };
    dispatch(addToCart(data));
    navigate("/cart");
  };

  const handleWishlist = async () => {
    try {
      await axios.post("http://localhost:3000/api/v1/wishListProduct", {
        id: userId,
        productId: id,
      });
      Swal.fire({
        icon: "success",
        title: "Thêm vào yêu thích thành công!",
        showConfirmButton: false,
        timer: 1500,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const formatPrice = (price) => {
    if (price === undefined || price === null) {
      return "";
    }
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  };

  return (
    <div className="container py-5 mt-24">
      <div className="row">
        <div className="col-md-5">
          <img
            src={vaccine.image}
            alt={vaccine.name}
            className="img-fluid"
            style={{ borderRadius: "5px", border: "1px solid #ddd", height: "auto", marginLeft: "120px" }}
          />
        </div>
        <div className="col-md-6">
          <h1 className="display-4">{vaccine.name}</h1>
          <h2 className="text-danger">{formatPrice(vaccine.price)} VNĐ</h2>
          <p className="lead" dangerouslySetInnerHTML={{ __html: vaccine.description }}></p>
          <div className="mb-4">
            <strong>Kích cỡ: </strong>
            {vaccine?.size?.map((size) => (
              <span
                key={size}
                onClick={() => handleSelectSize(size)}
                className={`badge badge-${selectedSize === size ? "primary" : "secondary"} mx-1 p-2 cursor-pointer`}
              >
                {size}
              </span>
            ))}
          </div>
          {error && <div className="text-danger">{error}</div>}
          <button
            onClick={handleAddToCart}
            className="btn btn-primary btn-lg btn-block mb-2"
            disabled={!selectedSize} // Disable button when no size is selected
          >
            THÊM VÀO GIỎ HÀNG
          </button>
          <button
            onClick={handleWishlist}
            className="btn btn-outline-secondary btn-lg btn-block"
          >
            THÊM VÀO YÊU THÍCH
          </button>
        </div>
      </div>
    
      {/* Comment Section */}
      <div className="row mt-5">
        <div className="col">
          <h3>Bình Luận</h3>
          <form>
            <div className="form-group">
              <label htmlFor="message">Bình Luận:</label>
              <textarea
                id="message"
                name="message"
                rows="4"
                className="form-control"
                placeholder="Nhập bình luận của bạn..."
                onChange={(e) => setComment(e.target.value)}
              ></textarea>
            </div>
            <button
              onClick={(e) => {
                e.preventDefault();
                handleAddComment(comment);
              }}
              className="btn btn-primary mt-3"
            >
              Gửi
            </button>
          </form>
        </div>
      </div>
      <div className="row mt-4">
        <div className="col">
          {commentList.length > 0 ? (
            commentList.map((item) => (
              <div key={item._id} className="media mb-4">
                <img
                  src="https://via.placeholder.com/40"
                  alt="User Avatar"
                  className="mr-3 rounded-circle"
                />
                <div className="media-body">
                  <h5 className="mt-0">{item.user_id?.username}</h5>
                  <p>{item.content}</p>
                  <small className="text-muted">
                    {new Date(item.createdAt).toLocaleDateString()}
                  </small>
                  {userId === item?.user_id?._id && (
                    <button
                      onClick={() => handleDeleteComment(item._id)}
                      className="btn btn-danger btn-sm ml-3"
                    >
                      Xóa
                    </button>
                  )}
                </div>
              </div>
            ))
          ) : (
            <p>Không có bình luận nào.</p>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default VaccinesDetail;
