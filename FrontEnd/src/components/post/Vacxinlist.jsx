import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Swiper, SwiperSlide } from "swiper/react";
import axios from "axios";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

// Import required modules
import { Autoplay, Pagination } from "swiper/modules";

function Vacxinlist() {
  const auth = useSelector((state) => state.auth.currentUser);
  const [wishlist, setWishlist] = useState([]);

  useEffect(() => {
    const fetchWishlist = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/api/v1/wishListProduct/${auth._id}`);
        setWishlist(response.data.user.wishList);
      } catch (error) {
        console.error('There was an error fetching the wishlist!', error);
      }
    };

    if (auth) {
      fetchWishlist();
    }
  }, [auth]);

  if (!auth) {
    return (
      <div style={{ marginTop: "200px" }}>
        <p>Please log in to see your wishlist.</p>
      </div>
    );
  }

  return (
    <div className="container-fluid py-5 wow fadeInUp" data-wow-delay="0.1s">
      <div className="container">
        <div className="row g-5">
          <div className="col-lg-12">
            <div className="section-title mb-4">
              <h5 className="position-relative d-inline-block text-primary text-uppercase">
                Top sản phẩm yêu thích
              </h5>
            </div>
          </div>
        </div>
        <div className="w-full mx-auto">
          <Swiper 

            slidesPerView={4}
            
            spaceBetween={10}
            autoplay={{
              delay: 2000,
              disableOnInteraction: false,
            }}
            modules={[Autoplay, Pagination]}
            className="mySwiper"
          >
            {wishlist.length > 0 ? (
              wishlist.map((product) => (
                <SwiperSlide key={product._id}>
                  <div className="wishlist-item">
                    <img style={{float:"left",width:"100px",height:"100px"}} src={product.image} alt={product.name} />
                    <p style={{float:"left",marginTop:"40px",marginLeft:"20px"}}>{product.name}</p>
                    
                  </div>
                </SwiperSlide>
              ))
            ) : (
              <SwiperSlide>
                <div className="text-center w-100">
                  Your wishlist is empty.
                </div>
              </SwiperSlide>
            )}
          </Swiper>
        </div>
      </div>
    </div>
  );
}

export default Vacxinlist;
