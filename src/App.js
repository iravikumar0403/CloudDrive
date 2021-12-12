import React from 'react'
import { Route, Routes } from 'react-router-dom'
import { Home, Login, Register } from './components'

const App = () => {
    return (
        <Routes>
            <Route path="/" element={<Home/>}>
                <Route index element={<Login/>}/>
                <Route path="/register" element={<Register/>}/>
            </Route>
        </Routes>
    )
}

export default App
