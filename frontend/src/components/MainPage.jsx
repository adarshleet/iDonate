import React from 'react'
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux';

function MainPage() {
    const { userInfo } = useSelector((state) => state.auth)
    console.log(userInfo);
    return (
        <main className='d-flex justify-content-center align-items-center' style={{ height: "90vh" }}>
            <div className='p-5 border border-2'>
                <h4>USER MANAGEMENT SYSTEM USING REACT</h4>
            {userInfo ? 
            <div className='d-flex'>
                <div style={{width:'9rem'}} className='me-3'>
                    {userInfo.image == '' ? 
                    <img className='img-fluid' src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png" alt="" /> :
                    <img className='img-fluid' src={userInfo.image} alt="" />
                    }
                </div>
                <div>
                    <h5>Name : {userInfo.name}</h5>
                    <h5>Email : {userInfo.email}</h5>
                </div>
            </div>
            :
                <div className='d-flex justify-content-center my-3'>
                    <Link className='btn btn-secondary mx-2' to="/login">LOGIN</Link>
                    <Link className='btn btn-secondary mx-2' to="/signup">SIGNUP</Link>
                </div>
            }       
            </div>
        </main>
    )
}

export default MainPage
