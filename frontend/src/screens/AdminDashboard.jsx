import React, { useEffect, useState } from 'react'
import { useGetUserDataMutation } from '../slices/adminApiSlice'
import { Link, useNavigate } from 'react-router-dom'
import { useAdminUserDeleteMutation } from '../slices/adminApiSlice'
import { toast } from 'react-toastify'
import Loader from '../components/Loader'

function AdminDashboard() {
    const [usersData, setUsers] = useState([])
    const [search,setSearch] = useState('')

    const [userData, { isLoading }] = useGetUserDataMutation()
    const [userDelete,{ isLoadingDelete }] = useAdminUserDeleteMutation()

    const navigate = useNavigate()

    useEffect(() => {
        const fetchUserData = async () => {
            const users = await userData(search).unwrap('')
            setUsers(users)
        }
        fetchUserData()
    }, [search])

    const deleteUser = async(userId) =>{
        await userDelete(userId).unwrap('')
        setUsers((prevUsers) => prevUsers.filter((user) => user._id !== userId));
        toast.success('user deleted succesfully')
        navigate('/admin/dashboard')
    }

    return (
        <main className='d-flex justify-content-center mt-5'>
            <section class="intro">
                <div class="bg-image h-100" >
                    <div class="mask d-flex align-items-center h-100">
                        <div class="container">
                            <div class="row justify-content-center">
                                <div class="col-12">
                                    <div class="card">
                                        <div class="card-body p-0">
                                            <div class="table-responsive table-scroll" data-mdb-perfect-scrollbar="true" style={{ position: 'relative' }}>
                                                <h4 className='text-center py-3'>USERS DETAILS</h4>
                                                <div className='d-flex justify-content-between align-items-center'>
                                                    <input className='form-control m-3 w-25' type="text" placeholder='Search User' value={search} onChange={(e)=>setSearch(e.target.value)}/>
                                                    <Link className='btn btn-primary m-3' to={'/admin/addUser'}>Add New User</Link>
                                                </div>
                                                <table class="table table-striped mb-0 text-center" style={{ width: '50rem' }}>
                                                    <thead>
                                                        <tr>
                                                            <th scope="col">#</th>
                                                            <th scope="col">NAME</th>
                                                            <th scope="col">EMAIL</th>
                                                            <th scope="col">ACTION</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {usersData.length ? 
                                                            usersData.map((user,index) => (
                                                            <tr key={index}>
                                                                <td>{usersData.indexOf(user)+1}</td>
                                                                <td>{user.name}</td>
                                                                <td>{user.email}</td>
                                                                <td><Link className='btn btn-primary btn-sm mx-1' to={`/admin/editUser/${user._id}`}>Edit</Link>
                                                                <button className='btn btn-primary btn-sm mx-1' onClick={()=>deleteUser(user._id)}>Delete</button>
                                                                </td>
                                                            </tr>
                                                        )) : 
                                                        <h4 className='text-center'>No Users</h4>}
                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    )
}

export default AdminDashboard
