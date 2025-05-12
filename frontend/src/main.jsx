import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import store from "./store/store.js";
import { Provider } from "react-redux";
import AuthLayout from "./components/AuthLayout.jsx";
import SignUpPage from "./pages/SignUpPage.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import HomePage from "./pages/HomePage.jsx";
import MySkills from "./components/MySkills.jsx";
import Sessions from "./components/Sessions.jsx";
import Resources from "./components/Resources.jsx";
import Community from "./components/Community.jsx";
import Messages from "./components/Messages.jsx";
import Settings from "./components/Settings.jsx";
import EventsPage from "./pages/EventsPage.jsx";
import CommunityRooms from "./components/CoummunityRooms.jsx";
import CommunityPage from "./pages/CommunityPage.jsx";
import Profile from "./components/Profile.jsx";
import NotFoundPage from "./pages/NotFoundPage.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "",
        element: <HomePage />,
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
        element: <AuthLayout children={<EventsPage />} authRequired={true} />,
      },
      {
        path: "resources",
        element: <AuthLayout children={<Resources />} authRequired={true} />,
      },
      {
        path: "community",
        element: (
          <AuthLayout children={<CommunityPage />} authRequired={true} />
        ),
      },
      {
        path: "settings",
        element: <AuthLayout children={<Settings />} authRequired={true} />,
      },
      {
        path: "profile",
        element: <AuthLayout children={<Profile />} authRequired={true} />,
      },
      {
        path: "*",
        element: <NotFoundPage />,
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
);
