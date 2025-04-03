import { Outlet } from "react-router-dom";
import "./App.css";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import {login, logout} from './store/authSlice'
import { Footer, Header, MainLoader, Sidebar, UtilityBar } from "./components";
import useGetRequest from "./hooks/useGetRequest";


function App() {
  const isAuthenticated = useSelector((state) => state.auth.status);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    setLoading(true);
    const token = localStorage.getItem('token');
  
    if (!token) {
      dispatch(logout());
      setLoading(false);
      return;
    }
  
    useGetRequest(`${import.meta.env.VITE_API_ROUTE}/api/auth/me`, {Authorization: `Bearer ${token}`})
      .then((userData) => {
        if (userData?.name) {
          dispatch(login({...userData}));
        } else {
          console.log(userData.error);
          setError(userData.error);
          dispatch(logout());
        }
      })
      .catch(error => {
        console.log(error);
        dispatch(logout());
      })
      .finally(() => {
        const randomDelay = Math.floor(Math.random() * (1400 - 1000 + 1)) + 1000; // Random delay between 400ms - 1000ms
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
      </>
    );
  }

  return (
    <>
      <div className="flex">
        <Sidebar className={"min-h-screen fixed bg-amber-200"} />
        <div className="flex flex-col w-full">
          <UtilityBar />
          <Outlet />
        </div>
      </div>
      <Footer />
    </>
  );
}

export default App;
