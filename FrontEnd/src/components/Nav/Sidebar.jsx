import "./Sidebar.css";
import {
  HomeIcon,
  QrCodeIcon,
  ClipboardDocumentListIcon,
  ShoppingBagIcon,
  ChatBubbleOvalLeftIcon,
  UserIcon,
} from "@heroicons/react/24/solid";
import MedicalInformationIcon from "@mui/icons-material/MedicalInformation";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Sidebar = () => {
  const auth = useSelector((state) => state.auth.currentUser);

  return (
    <>
      <div className="h-max">
        {/* <!-- Main Sidebar Container --> */}
        <aside className="main-sidebar sidebar-primary bg-blue-900 elevation-4">
          <div className="sidebar pt-4">
            <nav className="mt-2">
              <ul
                className="nav nav-pills nav-sidebar flex-column"
                data-widget="treeview"
                role="menu"
                data-accordion="false"
              >
                <li className="nav-item">
                  <Link to="/dashBoard" className="nav-link text-white">
                    <HomeIcon className="h-5 w-5" />
                    <p className="ml-2">Thống Kê</p>
                  </Link>
                </li>
                <li className="nav-item ">
                  <Link to="/category" className="nav-link text-white">
                    <HomeIcon className="h-5 w-5" />
                    <p className="ml-2">Danh Mục Sản Phẩm</p>
                  </Link>
                </li>
                <li className="nav-item ">
                  <Link to="/VaccineManagement" className="nav-link text-white">
                    <MedicalInformationIcon className="h-5 w-5" />
                    <p className="ml-2">Quản Lý Sản Phẩm</p>
                  </Link>
                </li>
            
          
                <li className="nav-item ">
                  <Link to="/otherManagement" className="nav-link text-white">
                    <ShoppingBagIcon className="h-5 w-5" />
                    <p className="ml-2">Quản Lý Hóa Đơn</p>
                  </Link>
                </li>
               
              
                <li className="nav-item ">
                  <Link to="/mess" className="nav-link text-white">
                    <ChatBubbleOvalLeftIcon className="h-5 w-5" />
                    <p className="ml-2">Tin Nhắn</p>
                  </Link>
                </li>
                <li className="nav-item ">
                  <Link to="/commentManagement" className="nav-link text-white">
                    <HomeIcon className="h-5 w-5" />
                    <p className="ml-2">Bình Luận</p>
                  </Link>
                </li>
                <li className="nav-item ">
                  
                </li>
               
                {auth.role === "admin" && (
                  <li className="nav-item ">
                    <Link
                      to="/AccountManagement"
                      className="nav-link text-white"
                    >
                      <UserIcon className="h-5 w-5" />
                      <p className="ml-2">Quản Lý Tài Khoản</p>
                    </Link>
                  </li>
                )}
              </ul>
            </nav>
          </div>
        </aside>
      </div>
    </>
  );
};

export default Sidebar;
