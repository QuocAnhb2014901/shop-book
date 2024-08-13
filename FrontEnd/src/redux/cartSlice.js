import { createSlice } from "@reduxjs/toolkit";
import Swal from "sweetalert2";

const initialState = {
  cart: localStorage.getItem("cart")
    ? JSON.parse(localStorage.getItem("cart"))
    : [],
  isLoading: false,
  error: null,
};
const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const index = state.cart.findIndex(
        (item) => item.vaccine_id === action.payload.vaccine_id
      );
      if (index >= 0) {
        state.cart[index].quantity += 1;
      } else {
        state.cart.push({ ...action.payload, quantity: 1 });
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Thêm thành công",
          showConfirmButton: false,
          timer: 1500,
        });
      }
      localStorage.setItem("cart", JSON.stringify(state.cart));
    },
    incrementQuantity: (state, action) => {
      const index = state.cart.findIndex(
        (item) => item.vaccine_id === action.payload
      );
      console.log(index);
      state.cart[index].quantity += 1;
      // update localStorage
      localStorage.setItem("cart", JSON.stringify(state.cart));
    },
    decrementQuantity: (state, action) => {
      const index = state.cart.findIndex(
        (item) => item.vaccine_id === action.payload
      );
      state.cart[index].quantity -= 1;
      // update localStorage
      localStorage.setItem("cart", JSON.stringify(state.cart));
    },
    removeCart: (state, action) => {
      const index = state.cart.findIndex(
        (item) => item.vaccine_id === action.payload
      );
      state.cart.splice(index, 1);
      localStorage.setItem("cart", JSON.stringify(state.cart)); 
    },
  },
});
export const { addToCart, incrementQuantity, decrementQuantity, removeCart } =
  cartSlice.actions;
export default cartSlice.reducer;
export const selectCart = (state) => state.cart.cart;
