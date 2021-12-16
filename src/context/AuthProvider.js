import React, { createContext, useContext } from 'react'
import useAuth from '../hooks/useAuth';

const authContext = createContext()

export const AuthProvider = ({ children }) => {
    
    const auth = useAuth();

    return (
        <authContext.Provider value={auth}>
            {children}
        </authContext.Provider>
    )
}

export const useAuthProvider = () => {
    return useContext(authContext)
}