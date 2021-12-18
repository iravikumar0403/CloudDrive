import React from 'react'
import { Route, Routes } from 'react-router-dom'
import { Dashboard, Login, Register, Navbar} from './components'
import PrivateRoute from './components/PrivateRoute'
import './App.css'

const App = () => {
    return (<>
        <Navbar />
        <Routes>
        <Route path="/login" element={<Login/>}/>
        <Route path="/register" element={<Register/>}/>
        <Route path="/" element={<PrivateRoute/>}>
            <Route index element={<Dashboard/>}/>
            <Route path="/folder/:folder_id" element={<Dashboard/>}/>
            <Route path="/file/:file_id" element={<Dashboard/>}/>
        </Route>
        </Routes>
    </>
    )
}

export default App
