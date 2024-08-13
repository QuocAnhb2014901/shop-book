import { useDispatch } from "react-redux";
import { logOut } from "../../redux/authSlice";

const Nav = () => {
  const dispatch = useDispatch();
  const handleLogOut = () => {
    dispatch(logOut());
    window.location.href = "/";
  };
  return (
    <div className="w-full">
      {/* <!-- Navbar --> */}
      <nav className="main-header navbar navbar-expand navbar-white navbar-light">
        {/* <!-- Left navbar links --> */}
        <ul className="navbar-nav items-center justify-items-center">
          <li className="nav-item">
            <a
              className="nav-link"
              data-widget="pushmenu"
              href="#"
              role="button"
            >
              <i className="fas fa-bars"></i>
            </a>
          </li>
          <li className="nav-item d-none d-sm-inline-block">
            <a href="/" className="nav-link mb-2">
              Trang chủ
            </a>
          </li>
        </ul>

        {/* <!-- Right navbar links --> */}
        <ul className="navbar-nav ml-auto">
          <li className="nav-item">
          <button onClick={handleLogOut} className="ml-1 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
  Đăng Xuất
</button>

          </li>
        </ul>
      </nav>
      {/* <!-- /.navbar --> */}
    </div>
  );
};

export default Nav;
