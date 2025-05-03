import React, { useEffect, useState } from 'react'
import {useSelector} from 'react-redux'
import { useNavigate } from 'react-router-dom';
import {MainLoader} from './';

function AuthLayout({children, authRequired = true}) {
  const [loading, setLoading] = useState(true);
  const isAuthenticated = useSelector((state) => state.auth.status)
  const navigate = useNavigate();

  useEffect(() => {
    if (authRequired && isAuthenticated !== authRequired) {
      navigate("/login");
    } else if (!authRequired && isAuthenticated !== authRequired) {
      navigate("/");
    }
    setLoading(false);
  }, [navigate, isAuthenticated, authRequired])


  return ( !loading ?
    <div className='w-full'>
      {children}
    </div> : <MainLoader isLoading={loading} />
  )
}

export default AuthLayout
