import React from "react";
// import logo from './logo.svg';
// import './App.css';
import './assets/css/style.css';
import 'remixicon/fonts/remixicon.css';
import 'react-toastify/dist/ReactToastify.css';
import MainLayout from "./shared/layout/mainLayout";
import { BrowserRouter } from "react-router-dom";
import axios from 'axios';
import { ERROR_MESSAGES } from "./shared/appConfig/apiErrorCode";
import { toast } from 'react-toastify';

axios.interceptors.request.use(async function (config) {
  // Do something before request is sent
  const token = await localStorage.getItem("__t");
  if (token) {
    config.headers = {
      ...config.headers,
      'Authorization': `Bearer ${localStorage.getItem("__t")}`
    };
  }
  return config;
}, function (error) {
  // Do something with request error
  return Promise.reject(error);
});

axios.interceptors.response.use(function (response) {
  // Any status code that lie within the range of 2xx cause this function to trigger
  // Do something with response data
  return response;
}, function (error) {
  // Any status codes that falls outside the range of 2xx cause this function to trigger
  // Do something with response error
  // console.log("I am the error here:", error);
  if (error && error.response && error.response.data && error.response.data.err_msg && error.response.data.err_msg === 'INVALID_TOKEN' && error.response.status === 400) {
    localStorage.clear();
    toast.info(ERROR_MESSAGES[error.response.data.err_msg]);
  }
  else{
    // We need to show toasty message here for all the errors which are throwed from the backend in an error code
    if(error && error.response && error.response.data && error.response.data.err_msg && ERROR_MESSAGES[error.response.data.err_msg]){
      toast.error(ERROR_MESSAGES[error.response.data.err_msg]);
    }
    else{
      toast.error("Something went wrong please try again after sometime.");
    }
    
  }
  return Promise.reject(error);
});

function App() {
  return (
    <BrowserRouter>
      <MainLayout />
    </BrowserRouter>
  );
}

export default App;
