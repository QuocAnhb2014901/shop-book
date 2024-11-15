import { Link } from "react-router-dom";
import { logOut } from "../redux/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { useRef } from "react";

const Header = () => {
  const vaccineListRef = useRef(null);

  const scrollToVaccineList = () => {
    if (vaccineListRef.current) {
      vaccineListRef.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };
  const dispatch = useDispatch();
  const handleLogOut = () => {
    dispatch(logOut());
  };
  const user = useSelector((state) => state.auth.currentUser);

  return (
    <div>
      <div className="container-fluid bg-light ps-5 pe-0 d-none d-lg-block">
        <div className="row gx-0">
          <div className="col-md-6 text-center text-lg-start mb-2 mb-lg-0">
            <div className="d-inline-flex align-items-center">
              <small className="py-2">
                <i className="far fa-clock text-primary me-2"></i>Giờ mở cửa: T2
                - T7 : 6.00am - 10.00pm, CN nghỉ
              </small>
            </div>
          </div>
          <div className="col-md-6 text-center text-lg-end">
            <div className="position-relative d-inline-flex align-items-center bg-primary text-white top-shape px-5">
              <div className="me-3 pe-3 border-end py-2">
                <p className="m-0">
                  <i className="fa fa-envelope-open me-2"></i>
                  bookstore@gmail.com
                </p>
              </div>
              <div className="py-2">
                <p className="m-0">
                  <i className="fa fa-phone-alt me-2"></i>+012 345 6789
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <nav className="navbar navbar-expand-lg fixed z-50 w-full text-center bg-white navbar-light shadow-sm px-5 py-3 py-lg-0">
        <Link to="/" className="navbar-brand p-0">
          <h1 className="m-0 text-primary">
            <img
              src="https://polyvac.com.vn/wp-content/uploads/2023/04/logo.png"
              alt="home-logo"
              style={{ width: "20%" }}
            ></img>
          </h1>
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarCollapse"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className=" navbar-collapse" id="navbarCollapse">
          <div className="navbar-nav ms-auto py-0">
            <Link
              className="nav-link active"
              to={"/listVaccines"}
              onClick={scrollToVaccineList}
            >
              Sản Phẩm
            </Link>

            <Link className="nav-link active" to={"/calendar"}>
              Giới Thiệu
            </Link>
            <Link className="nav-link active" to={"/calendar"}>
              Sản Phẩm Yêu Thích
            </Link>

            <Link className="nav-link active" to={"/cart"}>
             Giỏ hàng
            </Link>
            <Link className="nav-link active" to={""}>
             Liên Hệ
            </Link>

            <Link className="nav-link active" to={"/my-order"}>
             Hóa Đơn
            </Link>

            
          </div>
          <ul className="nav-link flex items-center">
            <img className="w-[50px] rounded-full" src={user?.avatar} alt="" />
            <li className="dropdown">
              {user ? (
                <a
                  className="nav-link text-black dropdown-toggle text-lg"
                  data-bs-toggle="dropdown"
                  role="button"
                >
                  {user.username}
                </a>
              ) : (
                <div className="flex items-center ">
                  <a href="/login" className="nav-link ">
                    Đăng nhập
                  </a>
                  <a href="/register" className="nav-link ">
                    Đăng Ký
                  </a>
                </div>
              )}

              {user ? (
                <ul>
                  <li className="dropdown-menu">
                    <a
                      className="dropdown-item"
                      href={`/UpdateMain/${user._id}`}
                    >
                      Chỉnh Sửa Hồ Sơ
                    </a>
                    <a
                      onClick={handleLogOut}
                      href="#"
                      className="dropdown-item"
                    >
                      Đăng Xuất
                    </a>
                  </li>
                </ul>
              ) : null}
            </li>
          </ul>
        </div>
      </nav>

      {/* <div className="modal fade" id="searchModal" tabIndex="-1">
        <div className="modal-dialog modal-fullscreen">
          <div
            className="modal-content"
            style={{ background: "rgba(9, 30, 62, .7)" }}
          >
            <div className="modal-header border-0">
              <button
                type="button"
                className="btn bg-white btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              >&times;</button>
            </div>
            <div className="modal-body d-flex align-items-center justify-content-center">
              <div className="input-group" style={{ maxWidth: "600px" }}>
                <input
                  type="text"
                  className="form-control bg-transparent border-primary p-3 text-white"
                  placeholder="Type search keyword"
                />
                <button className="btn btn-primary px-4">
                  <i className="bi bi-search"></i>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div> */}
    </div>
  );
};

export default Header;
