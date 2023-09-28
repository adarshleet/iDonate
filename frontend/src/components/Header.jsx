import React from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useLogoutMutation } from '../slices/usersApiSlice';
import { logout } from '../slices/authSlice';

function Header() {

    const { userInfo } = useSelector((state) => state.auth)

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [logoutApiCall] = useLogoutMutation()
    
    const logoutHandler = async () =>{
        try {
            await logoutApiCall().unwrap()
            dispatch(logout());
            navigate('/login')
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <header>
            <nav class="navbar navbar-dark bg-dark px-5">
                <div class="container-fluid px-4">
                    <Link class="navbar-brand fw-bold" href='/'>React Project</Link>
                    {userInfo ? (
                        <div class="dropdown">
                            <button class=" btn btn-dark dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                                {userInfo.name}
                            </button>
                            <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                                <li><Link class="dropdown-item fw-bold" to="/profile">Profile</Link></li>
                                <li><Link class="dropdown-item" onClick={logoutHandler}>Logout</Link></li>
                            </ul>
                        </div>
                    ) : (
                        <div>
                            <Link className='a mx-2 text-white fw-bold' to='/login'>LOGIN</Link>
                            <Link className='a mx-2 text-white fw-bold' to="/signup">SIGNUP</Link>
                        </div>
                    )}
                </div>
            </nav>
        </header>
    )
}

export default Header
