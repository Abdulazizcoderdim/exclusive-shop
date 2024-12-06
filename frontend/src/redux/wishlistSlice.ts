import { WishListType } from '@/type';
import { createSlice } from '@reduxjs/toolkit';

const initialState: WishListType = {
  wishList: [],
};

const wishListSlice = createSlice({
  name: 'wishList',
  initialState,
  reducers: {
    addToWishList(state, action) {
      state.wishList.push(action.payload);
    },
    deleteWishList(state, action) {
      state.wishList = state.wishList.filter(
        item => item._id !== action.payload
      );
    },
    clearWishList(state) {
      state.wishList = [];
    },

    // moveAllToCart(state) {
    //   state.cart = state.cart.concat(state.wishList);
    //   state.wishList = [];
    // },
    // toggleWishList(state, action) {
    //   const item = state.wishList.find(
    //     (item: any) => item._id === action.payload
    //   );
    //   if (item) {
    //     state.wishList = state.wishList.filter(
    //       (item: any) => item._id !== action.payload
    //     );
    //   } else {
    //     state.wishList.push(action.payload);
    //   }
    // },
  },
});

export const { addToWishList, deleteWishList, clearWishList } = wishListSlice.actions;
export default wishListSlice.reducer;

export const getWishList = (state: { wishList: WishListType }) =>
  state.wishList.wishList;

export const getTotalWishListQuantity = (state: { wishList: WishListType }) => {
  if (!state.wishList.wishList || state.wishList.wishList.length === 0) {
    return 0; // agar savat bo'sh bo'lsa, 0 qaytaring
  }
  return state.wishList.wishList.reduce((sum, item) => sum + item.quantity, 0);
};
