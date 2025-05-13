import { Outlet } from "react-router-dom";
import "./App.css";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { login, logout } from "./store/authSlice";
import { Footer, Header, MainLoader, Sidebar, UtilityBar } from "./components";
import useGetRequest from "./hooks/useGetRequest";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { SocketProvider } from "./hooks/Socket";

function App() {
  const isAuthenticated = useSelector((state) => state.auth.status);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const userId = useSelector((state) => state.auth.userData?._id)

  useEffect(() => {
    setLoading(true);
    const token = localStorage.getItem("token");

    if (!token) {
      dispatch(logout());
      setLoading(false);
      return;
    }

    useGetRequest(`${import.meta.env.VITE_API_URL}/api/auth/me`, {
      Authorization: `Bearer ${token}`,
    })
      .then((userData) => {
        if (userData?.name) {
          dispatch(login({ ...userData }));
        } else {
          console.log(userData.error);
          setError(userData.error);
          dispatch(logout());
        }
      })
      .catch((error) => {
        console.log(error);
        dispatch(logout());
      })
      .finally(() => {
        const randomDelay =
          Math.floor(Math.random() * (1400 - 1000 + 1)) + 1000; // Random delay between 400ms - 1000ms
        setTimeout(() => setLoading(false), randomDelay);
      });
  }, [dispatch]);

  if (loading) return <MainLoader />;

  if (!isAuthenticated) {
    return (
      <>
        <Header />
        <Outlet />
        <Footer />
        <ToastContainer
          className={'z-50'}
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick={false}
          rtl={false}
          pauseOnFocusLoss={false}
          draggable
          pauseOnHover
          theme="light"
        />
      </>
    );
  }

  return (
    <SocketProvider userID={userId}>
      <div className="w-full min-h-screen flex flex-col">
        <div className="flex">
          <Sidebar className={"min-h-screen fixed bg-amber-200"} />
          <div className="flex flex-col w-full">
            <UtilityBar />
            <Outlet />
          </div>
        </div>
        <Footer />
      </div>
        <ToastContainer
          className={'z-50'}
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick={false}
          rtl={false}
          pauseOnFocusLoss={false}
          draggable
          pauseOnHover
          theme="light"
        />
    </SocketProvider>
  );
}

export default App;
