import React from 'react'
import { Navigate } from 'react-router-dom';
import { useAuthProvider } from '../context/AuthProvider';

const Dashboard = () => {

    const { currentUser } = useAuthProvider();
    if(!currentUser){
        return <Navigate replace to="/"/>
    }

    return (
        <div className='container'>
            <h1>Hello, {currentUser?.email}</h1>
        </div>
    )
}

export default Dashboard
