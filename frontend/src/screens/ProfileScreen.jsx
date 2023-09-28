import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-toastify'
import Loader from '../components/Loader';
import { useProfileUpdateMutation } from '../slices/usersApiSlice';
import { setCredentials } from '../slices/authSlice';

function ProfileScreen() {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [image, setImage] = useState(null)

    const { userInfo } = useSelector((state) => state.auth)

    const formData = new FormData();
    formData.append('name', name);
    formData.append('email', email);
    formData.append('password', password);
    formData.append('image', image);

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [update, { isLoading }] = useProfileUpdateMutation()

    useEffect(() => {
        setName(userInfo.name)
        setEmail(userInfo.email)
    }, [userInfo.setName,userInfo.setEmail])

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
        else if (password.length != 0 && password.length < 4) {
            toast.error('Enter a strong password')
        }
        else if (password !== confirmPassword) {
            toast.error('Passwords do not match')
        }
        else {
            try {
                const res = await update(formData).unwrap("");
                if(res.user){
                    toast.error('existing email id')
                    navigate('/profile')
                }
                else{
                    dispatch(setCredentials({ ...res }))
                    toast.success('profile details updated')
                    navigate('/')
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
                    <h4 className='text-center fw-bold mb-3'>UPDATE</h4>
                    <input type="text" className='form-control my-2' placeholder='Name' value={name} onChange={(e) => setName(e.target.value)} />
                    <input type="text" className='form-control my-2' placeholder='Email' value={email} onChange={(e) => setEmail(e.target.value)} />
                    <input type="password" className='form-control my-2' placeholder='Password' value={password} onChange={(e) => setPassword(e.target.value)} />
                    <input type="password" className='form-control my-2' placeholder='Confirm Password' value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />

                    <label htmlFor="Profile image">Profile image</label>
                    <input className='form-control my-2' type="file" name='image' onChange={(e) => setImage(e.target.files[0])} />

                    {isLoading && <Loader />}

                    <button className='btn btn-secondary w-100 mt-3 fw-bold'>UPDATE USER</button>
                </form>
            </div>
        </main>
    )
}

export default ProfileScreen
