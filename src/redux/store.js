import { configureStore } from "@reduxjs/toolkit";
import cart from "./cart";

const store = configureStore({
    reducer: { cart }
});

export default store;
