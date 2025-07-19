import { apiSlice } from "./apiSlice.js";
import { USERS_URL } from "../constants.js";


export const userApiSlice= apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        // Define your endpoint here. This will be used in your application code to trigger a login request.
        login: builder.mutation({
            query:(data)=>({
                url: `${USERS_URL}/auth`,
                method: 'POST',
                body: data
            })
        }),

        logout: builder.mutation({
            query: () => ({
                url: `${USERS_URL}/logout`,
                method: 'POST'
            })
        }),

        register: builder.mutation({
            query: (data)=>({
                url: `${USERS_URL}`,
                method: 'POST',
                body: data
            })  
        }),

        profile: builder.mutation({
            query: (data) => ({             
                url: `${USERS_URL}/profile`,
                method: 'PUT',
                body: data
            }),
        }),


        //Admin related endpoints
        // Get all users (Admin only)
        getUsers : builder.query({
            query: () => ({
                url: `${USERS_URL}`
            }),
            providesTags:['User'],
            keepUnusedDataFor: 5 // Cache for 5 seconds
        }),
        // Delete a user (Admin only)
        deleteUser: builder.mutation({
            query: (userId) => ({
                url: `${USERS_URL}/${userId}`,
                method: 'DELETE'
            }),
            invalidatesTags: ['User'] // ✅ needed
        }),
        // Get user details by ID (Admin only)
        getUserDetails: builder.query({
            query: (userId) => ({
                url: `${USERS_URL}/${userId}`
            }),
            keepUnusedDataFor: 5 // Cache for 5 seconds
        }),
        // Update user details (Admin only)
        updateUser : builder.mutation({
            query: (data) => ({
                url: `${USERS_URL}/${data.userId}`,
                method: 'PUT',
                body: data,
            }),
            invalidatesTags: ['User'] // Invalidate the user list cache after updating a user
        })

    })
})

export const {
     useLoginMutation,
     useLogoutMutation, 
     useRegisterMutation,
     useProfileMutation,
     // Admin related hooks
     useGetUsersQuery,
     useDeleteUserMutation,
     useUpdateUserMutation,
     useGetUserDetailsQuery,
} = userApiSlice;