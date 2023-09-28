import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider, useLocation } from 'react-router-dom'
import store from './store.js'
import { Provider } from 'react-redux'
import './index.css'
import PrivateRoute from './components/PrivateRoute.jsx'
import HomeScreen from './screens/HomeScreen.jsx'
import LoginScreen from './screens/LoginScreen.jsx'
import SignupScreen from './screens/SignupScreen.jsx'
import ProfileScreen from './screens/ProfileScreen.jsx'
import AdminLoginScreen from './screens/AdminLoginScreen.jsx'
import AdminDashboard from './screens/AdminDashboard.jsx'
import AdminEditUser from './screens/AdminEditUser.jsx'
import AdminAddUser from './screens/AdminAddUser.jsx'
import PrivateRouteAdmin from './components/priveteRouteAdmin.jsx'


const router = createBrowserRouter(
    createRoutesFromElements(
        <Route path='/' element={<App />}>
            <Route index={true} path='/' element={<HomeScreen />} />
            <Route path='/login' element={<LoginScreen />} />
            <Route path='/signup' element={<SignupScreen />} />
            <Route path='' element={<PrivateRoute />}>
                <Route path='/profile' element={<ProfileScreen />} />
            </Route>

            {/* admin routes */}
            <Route index={true} path='/admin' element={<AdminLoginScreen />} />
            <Route path='' element={<PrivateRouteAdmin/>}>
                <Route path='/admin/dashboard' element={<AdminDashboard/>}/>
                <Route path='/admin/editUser/:id' element={<AdminEditUser/>}/>
                <Route path='/admin/addUser' element={<AdminAddUser/>}/>
            </Route>
        </Route>
    )
)

ReactDOM.createRoot(document.getElementById('root')).render(
    <Provider store={store}>
        <React.StrictMode>
            <RouterProvider router={router} />
        </React.StrictMode>
    </Provider>
)
