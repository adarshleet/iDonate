import React, { useState,useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch,useSelector } from 'react-redux';
import { useLoginMutation } from '../slices/usersApiSlice';
import { setCredentials } from '../slices/authSlice';
import { toast} from 'react-toastify'
import Loader from '../components/Loader';

function LoginScreen() {
    const[email,setEmail] = useState('')
    const[password,setPassword] = useState('')

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const [login,{isLoading}] = useLoginMutation() 

    const {userInfo} = useSelector((state)=>state.auth)

    useEffect(()=>{
        if(userInfo){
            navigate('/')
        }
    },[navigate,userInfo])

    const submitHandler = async (e)=>{
        e.preventDefault();
        try {
            const res = await login({email,password}).unwrap();
            dispatch(setCredentials({...res}))
            navigate('/')
        } catch (err) {
            toast.error('invalid email or password');
        }
    }

    return (
        <main className='d-flex justify-content-center align-items-center' style={{ height: "90vh" }}>
            <div className='p-3 border border-2' style={{width:'20rem'}}>
                <form action="" onSubmit={submitHandler}>
                    <h4 className='text-center fw-bold mb-3'>LOGIN</h4>
                    <input type="text" className='form-control my-2' placeholder='Email' value={email} onChange={(e)=>setEmail(e.target.value)}/>
                    <input type="password" className='form-control my-2' placeholder='Password' value={password} onChange={(e)=>setPassword(e.target.value)}/>

                    {isLoading && <Loader/>}

                    <button className='btn btn-secondary w-100 mt-3 fw-bold'>LOGIN</button>
                    <div className='d-flex justify-content-center mt-2'>
                        <p className='me-2'>New User?</p>
                        <Link className='a' to="/signup">Signup</Link>
                    </div>
                </form>
            </div>
        </main>
    )
}

export default LoginScreen
