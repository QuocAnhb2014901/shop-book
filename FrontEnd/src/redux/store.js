import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./authSlice";
import vaccineSlice from "./vaccineSlice";
import registerVaccineSlice from "./registerVaccineSlice";
import storageSlice from "./storageSlice";
import userSlice from "./userSlice";
import patientSlice from "./patientSlice";
import categorySlice from "./categorySlice";
import vaccinePlanSlice from "./vaccinePlanSlice";
import commentSlice from "./commentSlice";
import cartSlice from "./cartSlice";
import otherSlice from "./otherSlice";
import messengerSlice from "./messengerSlice";
import postSlice from "./postSlice";
import categoryPostSlice from "./categoryPostSlice";
import statisticalSlice from "./statisticalSlice";
const store = configureStore({
  reducer: {
    auth: authSlice,
    vaccine: vaccineSlice,
    registerVaccine: registerVaccineSlice,
    storage: storageSlice,
    user: userSlice,
    patient: patientSlice,
    category: categorySlice,
    vaccinePlan: vaccinePlanSlice,
    comment: commentSlice,
    cart: cartSlice,
    other: otherSlice,
    messenger: messengerSlice,
    post: postSlice,
    categoryPost: categoryPostSlice,
    statistical: statisticalSlice,
  },
});

export default store;
