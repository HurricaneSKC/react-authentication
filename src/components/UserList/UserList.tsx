import React, { useState } from "react"
import {
  useFetchUsersQuery,
  useAddUserMutation,
  useDeleteUserMutation,
} from "../../services/authApi"
import AddUserForm from "./AddUserForm" // A form component to add new users
import "./UserList.scss"
import Button from "../Button/Button"

interface User {
  id: number
  first_name: string
  last_name: string
  email: string
}

const UserList = () => {
  const {
    data: users,
    error,
    isLoading,
    refetch,
  } = useFetchUsersQuery({ perPage: 10, page: 1 })
  const [addUser] = useAddUserMutation()
  const [deleteUser] = useDeleteUserMutation()

  // Function to add a new user
  const handleAddUser = async (newUser: {
    first_name: string
    last_name: string
    email: string
  }) => {
    try {
      await addUser(newUser).unwrap()
      refetch()
    } catch (error) {
      return error
    }
  }

  // Function to delete a user
  const handleDeleteUser = async (userId: number) => {
    try {
      await deleteUser(userId).unwrap()
      refetch()
    } catch (error) {
      return error
    }
  }

  if (isLoading) return <div>Loading...</div>
  if (error) return <div>Error occurred: {error.toString()}</div>

  return (
    <>
      <AddUserForm onAddUser={handleAddUser} />
      <ul className="UserList">
        {users.data.map((user: User) => (
          <li className="UserListItem" key={user.id}>
            <div>
              <p>
                Name: {user.first_name} {user.last_name}
              </p>
              <p>Email: {user.email}</p>
            </div>
            <Button
              customClassName="delete"
              onClick={() => handleDeleteUser(user.id)}
            >
              Delete
            </Button>
          </li>
        ))}
      </ul>
    </>
  )
}

export default UserList
