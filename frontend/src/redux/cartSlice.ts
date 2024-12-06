import { CartType } from '@/type';
import { createSlice } from '@reduxjs/toolkit';

const initialState: CartType = {
  cart: [],

  // cart: [
  //   {
  //     productId: 12,
  //     name: 'Mediterranean',
  //     quantity: 2,
  //     unitPrice: 16,
  //     totalPrice: 32,
  //   },
  // ],
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem: (state, action) => {
      console.log(state.cart); // Savatning hozirgi holatini ko'rish
      state.cart.push(action.payload);
    },
    deleteItem: (state, action) => {
      state.cart = state.cart.filter(item => item._id !== action.payload);
    },
    updateQuantity: (state: any, action) => {
      const { id, quantity } = action.payload;
      const item = state.find((item: any) => item._id === id);
      if (item) {
        item.quantity = quantity;
      }
    },
    clearCart(state) {
      state.cart = [];
    },
    moveAllToCart(state, action) {
      // Yangi mahsulotlarni dublikatlardan saqlanish uchun filtrlaymiz
      const newItems = action.payload.filter(
        (newItem: any) => !state.cart.some(item => item._id === newItem._id)
      );
      // Savatni yangilash
      state.cart = [...state.cart, ...newItems];
    },
  },
});

export const { addItem, deleteItem, clearCart, updateQuantity, moveAllToCart } =
  cartSlice.actions;
export default cartSlice.reducer;

export const getCart = (state: { cart: CartType }) => state.cart.cart;

export const getTotalCartQuantity = (state: { cart: CartType }) => {
  if (!state.cart.cart || state.cart.cart.length === 0) {
    return 0; // agar savat bo'sh bo'lsa, 0 qaytaring
  }
  return state.cart.cart.reduce((sum, item) => sum + item.quantity, 0);
};

export const getCurrentQuantityById =
  (id: string) => (state: { cart: CartType }) =>
    state.cart.cart.find(item => item._id === id)?.quantity ?? 0;
