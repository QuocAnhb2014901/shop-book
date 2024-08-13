import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layoutmain from "./components/Layoutmain.jsx";
import HomePage from "./pages/HomePage.jsx";
import SignUp from "./pages/SignUp.jsx";
import { Provider } from "react-redux";
import store from "./redux/store.js";
import SignIn from "./pages/SignIn.jsx";
import ForgotPassword from "./pages/ForgotPassword.jsx";
import ResetPassword from "./pages/ResetPassword.jsx";
import AccountManagement from "./components/Admin/pageAdmin/AccountManagement.jsx";
import Vaccin from "./components/Admin/pageAdmin/Vaccin.jsx";
import Addvaccin from "./components/Admin/cruds/AddVaccin.jsx";
import EditVaccin from "./components/Admin/cruds/EditVaccin.jsx";
import UpdateMain from "./components/Admin/pageAdmin/UpdateMain.jsx";
import AddCategory from "./components/Admin/cruds/addCategory.jsx";
import VaccinesDetail from "./pages/VaccinesDetail.jsx";
import PayVaccines from "./pages/PayVaccines.jsx";
import Cart from "./pages/Cart.jsx";
import Message from "./components/Admin/pageAdmin/Message.jsx";
import OtherManagement from "./components/Admin/pageAdmin/OtherManagement.jsx";
import CommentManagement from "./components/Admin/pageAdmin/CommentManagement.jsx";
import OtherDetails from "./components/Admin/pageAdmin/OtherDetails.jsx";
import OtherSuccess from "./pages/OtherSuccess.jsx";
import Dashboard from "./components/Admin/pageAdmin/Dashboard.jsx";
import MessageToPhone from "./components/Admin/pageAdmin/MessageToPhone.jsx";
import LayoutAdmin from "./components/LayoutAdmin.jsx";
import CategoryMain from "./components/Admin/pageAdmin/CategoryMain.jsx";
import Vacxinlist from "./components/post/Vacxinlist.jsx";
import ListVaccines from "./pages/ListVaccines.jsx";
import MyOrder from "./pages/MyOrder.jsx";
import MyOrderDetail from "./pages/MyOrderDetail.jsx";
import CategoryPage from "./pages/CategoryPage.jsx";
import Favatie from "./pages/favatie.jsx";
const router = createBrowserRouter([
  {
    element: <Layoutmain></Layoutmain>,
    children: [
      {
        path: "/",
        element: <HomePage></HomePage>,
      },
    {
      path:"/fava",
      element:<Favatie></Favatie>
    },
      {
        path: "/othersuccess",
        element: <OtherSuccess></OtherSuccess>,
      },
      {
        path: "/forgot-password",
        element: <ForgotPassword></ForgotPassword>,
      },
      {
        path: "/reset-password",
        element: <ResetPassword></ResetPassword>,
      },
     
     
      {
        path: "/cart",
        element: <Cart></Cart>,
      },
      {
        path: "/payvaccines",
        element: <PayVaccines></PayVaccines>,
      },
      {
        path: "/vacxindetail/:id",
        element: <VaccinesDetail></VaccinesDetail>,
      },
      {
        path: "/UpdateMain/:id",
        element: <UpdateMain></UpdateMain>,
      },
      {
        path: "/vaccinelist",
        element: <Vacxinlist></Vacxinlist>,
      },
      {
        path: "/listVaccines",
        element: <ListVaccines></ListVaccines>,
      },
      {
        path: "/category/:id",
        element: <CategoryPage></CategoryPage>,
      },
      {
        path: "/my-order",
        element: <MyOrder />,
      },
      {
        path: "/my-order-detail/:id",
        element: <MyOrderDetail />,
      },
    ],
  },
  {
    element: <LayoutAdmin></LayoutAdmin>,
    children: [
      {
        path: "/admin",
        element: <Dashboard></Dashboard>,
      },
      {
        path: "/dashBoard",
        element: <Dashboard></Dashboard>,
      },
      {
        path: "/VaccineManagement",
        element: <Vaccin></Vaccin>,
      },
      {
        path: "/Addvaccin",
        element: <Addvaccin></Addvaccin>,
      },
      {
        path: "/Editvaccin/:id",
        element: <EditVaccin></EditVaccin>,
      },
   
    
      {
        path: "/AccountManagement",
        element: <AccountManagement></AccountManagement>,
      },
     
      
      {
        path: "/addCategory",
        element: <AddCategory></AddCategory>,
      },
      {
        path: "/category",
        element: <CategoryMain></CategoryMain>,
      },
     
     
      {
        path: "/mess",
        element: <Message></Message>,
      },
      {
        path: "/otherManagement",
        element: <OtherManagement></OtherManagement>,
      },
      {
        path: "/commentManagement",
        element: <CommentManagement></CommentManagement>,
      },
      {
        path: "/otherdetails/:id",
        element: <OtherDetails></OtherDetails>,
      },
      {
        path: "/messToPhone",
        element: <MessageToPhone></MessageToPhone>,
      },
    ],
  },
  {
    path: "/login",
    element: <SignIn></SignIn>,
  },
  {
    path: "/register",
    element: <SignUp></SignUp>,
  },
  
]);
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router}>
        <App />
      </RouterProvider>
    </Provider>
  </React.StrictMode>
);
