import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { ProductType } from "@/types/Types";

interface WishState {
  wish: ProductType[];
}

const initialState: any = {
  wishList: [],
};

export const WishlistSlice = createSlice({
  name: "wishlist",
  initialState,
  reducers: {
    addToWish: (
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
      state.wishList.push({
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
    setWishlist: (state, action) => {
      state.wishList = action.payload;
    },
  },
});

export const { addToWish, setWishlist } = WishlistSlice.actions;

export default WishlistSlice.reducer;
