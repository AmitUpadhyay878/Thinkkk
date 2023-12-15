// import React from "react";
// import ReactDOM from "react-dom/client";
// import App from "./App";
// import "bootstrap/dist/css/bootstrap.min.css";
// import "./assets/css/style.scss";
// import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css";
// import "react-toastify/dist/ReactToastify.css";
// import "lazysizes";

// import { BrowserRouter } from "react-router-dom";
// import store from "./Redux/store";
// import { Provider } from "react-redux";
// import { ToastContainer } from "react-toastify";
// import ErrorBoundary from "./components/ErrorBoundary";
// const root = ReactDOM.createRoot(document.getElementById("root"));
// root.render(
//   <Provider store={store}>
//     <ErrorBoundary>
//       <BrowserRouter basename={process.env.REACT_APP_BASE_URL}>
//         <App />
//       </BrowserRouter>
//     </ErrorBoundary>
//     <ToastContainer autoClose={3000} position="top-right" newestOnTop />
//   </Provider>
// );


import React, { useEffect } from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import 'bootstrap/dist/css/bootstrap.min.css'
import './assets/css/style.scss'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import 'react-toastify/dist/ReactToastify.css'
import 'lazysizes'

import { BrowserRouter } from 'react-router-dom'
import store from './Redux/store'
import { Provider } from 'react-redux'
import { ToastContainer } from 'react-toastify'
import ErrorBoundary from './components/ErrorBoundary'
// import './i18n'
import './Local/i18n'

const root = ReactDOM.createRoot(document.getElementById('root'))

root.render(
    <Provider store={store}>
        <ErrorBoundary>
            <BrowserRouter basename={process.env.REACT_APP_BASE_URL}>
                <App />
            </BrowserRouter>
        </ErrorBoundary>
        <ToastContainer autoClose={3000} position="top-right" newestOnTop />
    </Provider>
)

