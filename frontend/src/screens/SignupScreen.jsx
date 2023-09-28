import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-toastify'
import Loader from '../components/Loader';
import { useSignupMutation } from '../slices/usersApiSlice';
import { setCredentials } from '../slices/authSlice';

function SignupScreen() {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [image, setImage] = useState(null)
    console.log(image)

    const formData = new FormData();
    formData.append('name', name);
    formData.append('email', email);
    formData.append('password', password);
    formData.append('image', image);
    console.log(formData)

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [signup, { isLoading }] = useSignupMutation()

    const { userInfo } = useSelector((state) => state.auth)

    useEffect(() => {
        if (userInfo) {
            navigate('/')
        }
    }, [navigate, userInfo])

    const submitHandler = async (e) => {
        e.preventDefault();
        function isValidEmail(email) {
            const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
            return emailRegex.test(email);
        }
        if (name.length < 3) {
            toast.error('Enter a valid name')
        }
        else if (!isValidEmail(email)) {
            toast.error('Enter a valid email')
        }
        else if (password.length < 4) {
            toast.error('Enter a strong password')
        }
        else if (password !== confirmPassword) {
            toast.error('Passwords do not match')
        }
        else {
            try {
                const res = await signup(formData).unwrap("");
                console.log(res);
                // dispatch(setCredentials({ ...res }))
                if(res.user == true){
                    toast.error('existing email id')
                }
                else{
                    toast.success('signup succesfull. please login')
                    navigate('/login')
                }
            } catch (error) {
                console.log(error.message);
            }
        }
    }

    return (
        <main className='d-flex justify-content-center align-items-center' style={{ height: "90vh" }}>
            <div className='p-3 border border-2' style={{ width: '20rem' }}>
                <form onSubmit={submitHandler} encType="multipart/form-data">
                    <h4 className='text-center fw-bold mb-3'>SIGNUP</h4>
                    <input type="text" className='form-control my-2' placeholder='Name' value={name} onChange={(e) => setName(e.target.value)} />
                    <input type="text" className='form-control my-2' placeholder='Email' value={email} onChange={(e) => setEmail(e.target.value)} />
                    <input type="password" className='form-control my-2' placeholder='Password' value={password} onChange={(e) => setPassword(e.target.value)} />
                    <input type="password" className='form-control my-2' placeholder='Confirm Password' value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />

                    <label htmlFor="Profile image">Profile image</label>
                    <input className='form-control my-2' type="file" name='image' onChange={(e) => setImage(e.target.files[0])} />

                    {isLoading && <Loader />}

                    <button className='btn btn-secondary w-100 mt-3 fw-bold'>SIGNUP</button>
                    <div className='d-flex justify-content-center mt-2'>
                        <p className='me-2'>Already a user?</p>
                        <Link className='a' to='/login'>Login</Link>
                    </div>
                </form>
            </div>
        </main>
    )
}

export default SignupScreen
