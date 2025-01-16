import { createSlice } from '@reduxjs/toolkit'

const CartSlicer = createSlice({
  name: 'Cart',
  initialState: {
    data: [],
    isAuth: false,
    isPending: false,
    isError: ''
  },
  reducers: {
    getCartPending (state) {
      state.isPending = true
      state.isError = ''
    },
    getCartSuccess (state, { payload }) {
      state.isAuth = true
      state.data = payload
      state.isPending = false
    },
    getCartError (state, { payload }) {
      state.isPending = false
      state.isError = payload
    },
    deleteCart (state, { payload }) {
      state.data = state.data.filter(Cart => Cart.id !== payload)
    }
  }
})

export const { getCartError, getCartPending, getCartSuccess, deleteCart } =
  CartSlicer.actions

export default CartSlicer.reducer
