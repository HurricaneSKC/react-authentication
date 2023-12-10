import React, { ChangeEvent, useState } from "react"
import InputField from "../Input/InputField"
import Button from "../Button/Button"

interface AddUserFormProps {
  onAddUser: (user: {
    first_name: string
    last_name: string
    email: string
  }) => void
}

const AddUserForm: React.FC<AddUserFormProps> = ({ onAddUser }) => {
  const [newUser, setNewUser] = useState({
    first_name: "",
    last_name: "",
    email: "",
  })

  const [errors, setErrors] = useState({
    first_name: "",
    last_name: "",
    email: "",
  })

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setNewUser({ ...newUser, [e.target.name]: e.target.value })
    setErrors({ first_name: "", last_name: "", email: "" })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onAddUser(newUser)
    setNewUser({ first_name: "", last_name: "", email: "" }) // Reset form
  }

  return (
    <form className="AddUserForm" onSubmit={handleSubmit}>
      <InputField
        type="text"
        name="first_name"
        value={newUser.first_name}
        onChange={handleChange}
        placeholder="First Name"
        error={errors.first_name}
      />
      <InputField
        type="text"
        name="last_name"
        value={newUser.last_name}
        onChange={handleChange}
        placeholder="Last Name"
        error={errors.last_name}
      />
      <InputField
        type="email"
        name="email"
        value={newUser.email}
        onChange={handleChange}
        placeholder="Email"
        error={errors.email}
      />
      <Button type="submit">Add User</Button>
    </form>
  )
}

export default AddUserForm
