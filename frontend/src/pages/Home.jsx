import React from 'react'
import { useSelector } from 'react-redux'
import LandingPage from './LandingPage'
import DashboardPage from './DashboardPage';

function Home() {

  const isAuthenticated = useSelector((state) => state.auth.status);
  
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

export default Home
