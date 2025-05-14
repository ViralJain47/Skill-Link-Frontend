import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { DashboardPage, LandingPage } from './';
import { SocketProvider } from '../hooks/Socket';
import { useAnimationControls } from 'framer-motion';

function HomePage() {

  const isAuthenticated = useSelector((state) => state.auth.status);
<<<<<<< HEAD
  const userId = useSelector((state) => state.auth.userData?._id)
=======
  const userId = useSelector((state) => state.auth.userData?._id);
>>>>>>> refs/remotes/origin/main

  useEffect(() => {
    console.log(userId)
    return () => {
      
    };
  }, []);
  
  return ( isAuthenticated ? 
      <>
           <DashboardPage />
      </>  
    :
    <>
      <LandingPage />
    </>
  )
}

export default HomePage
