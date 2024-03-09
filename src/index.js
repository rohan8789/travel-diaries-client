import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { ToastContainer} from "react-toastify";

import { AuthProvider } from "./shared/context/auth-context";

import "./index.css";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <>
    <AuthProvider>
      <App />
      <ToastContainer />
    </AuthProvider>
  </>
);
