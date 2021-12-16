import React from 'react'
import { Route, Routes } from 'react-router-dom'
import { Dashboard, Home, Login, Register } from './components'
import './App.css'

const App = () => {
    return (
        <Routes>
            <Route path="/" element={<Home/>}>
                <Route index element={<Login/>}/>
                <Route path="/register" element={<Register/>}/>
                <Route path="/dashboard" element={<Dashboard/>}/>
            </Route>
        </Routes>
    )
}

export default App
