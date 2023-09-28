import { apiSlice } from "./apiSlice";

const ADMIN_URL = '/api/admin'

export const adminApiSlice = apiSlice.injectEndpoints({
    endpoints:(builder) =>({
        adminLogin: builder.mutation({
            query:(data) =>({
                url: `${ADMIN_URL}/login`,
                method :'POST',
                body:data
            })
        }),
        getUserData:builder.mutation({
            query:(data)=>({
                url: `${ADMIN_URL}/getUserData/?search=${data}`,
                method : 'GET'
            })
        }),
        adminUserUpdate: builder.mutation({
            query:(data) =>({
                url: `${ADMIN_URL}/updateUser/?userId=${data.id}`,
                method :'PUT',
                body:data
            })
        }),
        adminUserDelete: builder.mutation({
            query:(data) =>({
                url: `${ADMIN_URL}/deleteUser?userId=${data}`,
                method :'DELETE',
                body:data
            })
        }),
        getSingleUser : builder.mutation({
            query:(data) =>({
                url: `${ADMIN_URL}/updateUser/${data}`,
                method: 'GET'
            })
        }),
        createUser : builder.mutation({
            query:(data)=>({
                url: `${ADMIN_URL}/createUser`,
                method:'POST',
                body:data
            })
        }),
        adminLogout : builder.mutation({
            query:()=>({
                url : `${ADMIN_URL}/logout`,
                method:'POST'
            })
        })

    })
})

export const {useAdminLoginMutation,useGetUserDataMutation,useAdminUserUpdateMutation,useAdminUserDeleteMutation,useGetSingleUserMutation,useCreateUserMutation
,useAdminLogoutMutation
} = adminApiSlice