import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import store from "./store/store.js";
import { Provider } from "react-redux";
import AuthLayout from "./components/AuthLayout.jsx";
import SignUpPage from "./components/pages/SignUpPage.jsx";
import LoginPage from "./components/pages/LoginPage.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "login",
        element: <AuthLayout children={<LoginPage />} authRequired={false} />,
      },
      {
        path: "register",
        element: <AuthLayout children={<SignUpPage />} authRequired={false}/>,
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
);
