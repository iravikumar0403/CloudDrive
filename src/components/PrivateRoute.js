
import React from 'react'
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuthProvider } from '../context/AuthProvider'

const PrivateRoute = () => {
    const { currentUser } = useAuthProvider();
    const location = useLocation();
    if(currentUser){
        return <Outlet/>
    }
    return (
        <Navigate replace to="/login" state={{from : location.pathname}}/>
    )
}

export default PrivateRoute
