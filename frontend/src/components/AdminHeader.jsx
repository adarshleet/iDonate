import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux';
import { useAdminLogoutMutation } from '../slices/adminApiSlice';
import { Adminlogout } from '../slices/authSlice';

function AdminHeader() {

    const {adminInfo} = useSelector((state)=> state.auth)

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [adminLogout] = useAdminLogoutMutation()

    const logoutHandler = async()=>{
        try {
            await adminLogout().unwrap()
            dispatch(Adminlogout());
            navigate('/admin')
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <header>
            <nav class="navbar navbar-dark bg-dark px-5">
                <div class="container-fluid px-4">
                    <Link class="navbar-brand fw-bold" to='/admin'>Admin Panel</Link>
                    {adminInfo && <button className='btn btn-danger btn-sm fw-bold' onClick={logoutHandler}>LOGOUT</button>}
                </div>
            </nav>
        </header>
    )
}

export default AdminHeader
