import React from 'react'
import { useSelector } from 'react-redux'
import { DashboardPage, LandingPage } from './';

function HomePage() {

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

export default HomePage
