import React from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import Header from './components/header'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import AdminHeader from './components/AdminHeader'

function App() {
    const location = useLocation();
    const isAdminRoute = location.pathname.startsWith("/admin");
    return (
        <div>
            {isAdminRoute ? <AdminHeader/> : <Header />}
            <ToastContainer />
            <Outlet />
        </div>
    )
}

export default App
