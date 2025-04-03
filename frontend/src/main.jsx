import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import store from "./store/store.js";
import { Provider } from "react-redux";
import { HomePage, LoginPage, SignUpPage } from './pages'
import { Messages, MySkills, Resources, Sessions, Settings, AuthLayout, Events, Community } from './components';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "",
        element: <HomePage />
      },
      {
        path: "login",
        element: <AuthLayout children={<LoginPage />} authRequired={false} />,
      },
      {
        path: "register",
        element: <AuthLayout children={<SignUpPage />} authRequired={false} />,
      },
      {
        path: "my-skills",
        element: <AuthLayout children={<MySkills />} authRequired={true} />,
      },
      {
        path: "messages",
        element: <AuthLayout children={<Messages />} authRequired={true} />,
      },
      {
        path: "sessions",
        element: <AuthLayout children={<Sessions />} authRequired={true} />,
      },
      {
        path: "events",
        element: <AuthLayout children={<Events />} authRequired={true} />,
      },
      {
        path: "resources",
        element: <AuthLayout children={<Resources />} authRequired={true} />,
      },
      {
        path: "community",
        element: <AuthLayout children={<Community />} authRequired={true} />,
      },
      {
        path: "settings",
        element: <AuthLayout children={<Settings />} authRequired={true} />,
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
);
