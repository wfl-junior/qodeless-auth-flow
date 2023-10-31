"use client";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";

interface ToastifyProps {}

export function Toastify({}: ToastifyProps): JSX.Element | null {
  return (
    <ToastContainer
      position="bottom-right"
      autoClose={3000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme="dark"
    />
  );
}
