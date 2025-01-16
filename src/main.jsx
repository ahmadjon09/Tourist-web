import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

import { configureStore } from '@reduxjs/toolkit'
import { Provider } from 'react-redux'
import UserReducer from './toolkit/UserSlicer.jsx'
import ServicesReducer from './toolkit/ServicesSlicer.jsx'
import GalleryReducer from './toolkit/GallerySlicer.jsx'
import ProductsReducer from './toolkit/ProductsSlicer.jsx'
import ProductsSaleReducer from './toolkit/ProductSaleSlicer.jsx'
import GuidesReducer from './toolkit/GuidesSlicer.jsx'
import PostsReducer from './toolkit/PostsSlicer.jsx'
import CartReducer from './toolkit/CartSlicer.jsx'

const store = configureStore({
  reducer: {
    cart: CartReducer,
    products: ProductsReducer,
    productsSale: ProductsSaleReducer,
    user: UserReducer,
    service: ServicesReducer,
    gallery: GalleryReducer,
    guides: GuidesReducer,
    posts: PostsReducer
  }
})

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <App />
  </Provider>
)
