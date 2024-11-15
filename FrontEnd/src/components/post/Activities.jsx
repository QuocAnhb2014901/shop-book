import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getVaccine } from "../../redux/vaccineSlice";
import { getCategory } from "../../redux/categorySlice";

function Activities() {
  const vaccineListRef = useRef(null);
  const dispatch = useDispatch();
  const vaccine = useSelector((state) => state.vaccine.vaccine);
  const category = useSelector((state) => state.category.category);
  const [selectedCategory, setSelectedCategory] = useState(null);

  useEffect(() => {
    dispatch(getVaccine());
    dispatch(getCategory());
  }, [dispatch]);

  const handleCategoryClick = (categoryId) => {
    setSelectedCategory(categoryId);
  };

  const handleShowAll = () => {
    setSelectedCategory(null); // Set selected category to null to display all products
  };

  const filteredVaccine = selectedCategory
    ? vaccine.filter((item) => item.category === selectedCategory)
    : vaccine;

  const formatPrice = (price) => {
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  };

  return (
    <div
      ref={vaccineListRef}
      className="container-fluid py-5 wow fadeInUp"
      data-wow-delay="0.1s"
    >
      <div style={{ background: "#eee" }} className="container">
        <div className="row g-5">
          <div className="col-lg-12">
            <div className="section-title mb-4">
              <h5
                style={{ fontSize: "50px" }}
                className="position-relative text-center text-primary text-uppercase"
              >
                Sản phẩm
              </h5>
              <div className="text-center">
                <button
                  onClick={handleShowAll}
                  className={`btn mx-1 ${
                    !selectedCategory ? "btn-primary" : "btn-secondary"
                  }`}
                >
                  Tất cả
                </button>
                {category.map((item) => (
                  <button
                    key={item._id}
                    onClick={() => handleCategoryClick(item._id)}
                    className={`btn ${
                      selectedCategory === item._id
                        ? "btn-primary"
                        : "btn-secondary"
                    } mx-1`}
                  >
                    {item.name}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          {filteredVaccine.length > 0 ? (
            filteredVaccine.map((item) => (
              <div className="col-md-3 mb-4" key={item._id}>
                <Link
                  to={`/vacxindetail/${item._id}`}
                  className="text-decoration-none"
                >
                  <div
                    className="card h-100 mx-auto wow zoomIn bg-white dark:bg-gray-800 dark:border-gray-700"
                    data-wow-delay="0.9s"
                    style={{
                      border: "1px solid #ddd",
                      borderRadius: "5px",
                      overflow: "hidden",
                    }}
                  >
                    <img
                      src={item.image}
                      alt={item.name}
                      className="card-img-top"
                      style={{ objectFit: "cover", height: "auto" }}
                    />
                    <div
                 
                      className="card-body  justify-content-center align-items-center text-center"
                    >
                      <h5 className="card-title ml-32 text-gray-700 dark:text-black W-FULL ml-10">
                        {item.name}
                      </h5>
                      <p className="card-text text-gray-500 dark:text-black">
                        {formatPrice(item.price)} VNĐ
                      </p>
                    </div>
                  </div>
                </Link>
              </div>
            ))
          ) : (
            <div className="text-center w-100">
              Không có sản phẩm nào trong danh mục này.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Activities;
