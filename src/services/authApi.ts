import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

const ENVIRONMENT = `http://localhost:3002`
const BASEURL = `${ENVIRONMENT}/api/`

const baseQuery = fetchBaseQuery({
  baseUrl: BASEURL,
  prepareHeaders: (headers, { getState }) => {
    const token = localStorage.getItem("authenticationToken")
    console.log(token)
    if (token) {
      headers.set("authorization", `Bearer ${token}`)
    }

    return headers
  },
})

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery,
  endpoints: (builder) => ({
    registerUser: builder.mutation({
      query: (user) => ({
        url: "register",
        method: "POST",
        body: user,
      }),
    }),
    loginUser: builder.mutation({
      query: (credentials) => ({
        url: "login",
        method: "POST",
        body: credentials,
      }),
    }),
    fetchUsers: builder.query({
      query: ({ perPage = 10, page = 1 }) =>
        `users?per_page=${perPage}&page=${page}`,
    }),
    addUser: builder.mutation({
      query: (newUser) => ({
        url: "users",
        method: "POST",
        body: newUser,
      }),
    }),
    deleteUser: builder.mutation({
      query: (userId) => ({
        url: `users/${userId}`,
        method: "DELETE",
      }),
    }),
  }),
})

export const {
  useRegisterUserMutation,
  useLoginUserMutation,
  useFetchUsersQuery,
  useAddUserMutation,
  useDeleteUserMutation,
} = authApi
