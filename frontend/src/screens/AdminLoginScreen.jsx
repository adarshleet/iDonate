import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useAdminLoginMutation } from '../slices/adminApiSlice';
import { setAdminCredentials } from '../slices/authSlice';
import { toast } from 'react-toastify'
import Loader from '../components/Loader';

function AdminLoginScreen() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const [adminLogin, { isLoading }] = useAdminLoginMutation()

    const { adminInfo } = useSelector((state) => state.auth)

    useEffect(() => {
        if (adminInfo) {
            navigate('/admin/dashboard')
        }
    }, [navigate, adminInfo])

    const submitHandler = async (e) => {
        e.preventDefault();
        try {
            const res = await adminLogin({ email, password }).unwrap();
            dispatch(setAdminCredentials({ ...res }))
            navigate('/admin/dashboard')
        } catch (err) {
            toast.error('invalid email or password');
        }
    }

    return (
        <main className='d-flex justify-content-center align-items-center' style={{ height: "90vh" }}>
            <div className='p-3 border border-2' style={{ width: '20rem' }}>
                <form action="" onSubmit={submitHandler}>
                    <h4 className='text-center fw-bold mb-3'>ADMIN LOGIN</h4>
                    <input type="text" className='form-control my-2' placeholder='Email' value={email} onChange={(e) => setEmail(e.target.value)} />
                    <input type="password" className='form-control my-2' placeholder='Password' value={password} onChange={(e) => setPassword(e.target.value)} />

                    {isLoading && <Loader />}

                    <button className='btn btn-secondary w-100 mt-3 fw-bold'>LOGIN</button>
                </form>
            </div>
        </main>
    )
}

export default AdminLoginScreen

