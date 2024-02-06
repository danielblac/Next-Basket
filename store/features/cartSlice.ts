import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ProductType } from "@/types/Types";

interface CartState {
  cart: ProductType[];
}
const initialState: any = {
  cart: [],
};

export const CartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (
      state,
      action: PayloadAction<{
        id: number;
        title: string;
        brand: string;
        category: string;
        description: string;
        price: number;
        discountPercentage: number;
        stock: number;
        rating: number;
        thumbnail: string;
        images: string[];
      }>
    ) => {
      state.cart.push({
        id: action.payload.id,
        title: action.payload.title,
        brand: action.payload.brand,
        category: action.payload.category,
        description: action.payload.description,
        price: action.payload.price,
        discountPercentage: action.payload.discountPercentage,
        stock: action.payload.stock,
        rating: action.payload.rating,
        thumbnail: action.payload.thumbnail,
        images: action.payload.images,
      });
    },
    setCart: (state, action) => {
      state.cart = action.payload
    }
  },
});

export const { addToCart, setCart } = CartSlice.actions;

export default CartSlice.reducer;
