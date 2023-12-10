import React, { ChangeEvent, FormEvent, useEffect, useState } from "react"
import InputField from "../Input/InputField"
import Button from "../Button/Button"
import "./RegistrationForm.scss"
import Header from "../Header/Header"
import { useRegisterUserMutation } from "../../services/authApi"
import { useNavigate, Link } from "react-router-dom"

const RegistrationForm = () => {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    password_confirmation: "",
  })

  const [errors, setErrors] = useState({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    password_confirmation: "",
  })

  const [registerUser, { isLoading, isSuccess, isError, error }] =
    useRegisterUserMutation()

  const validate = () => {
    let tempErrors = { ...errors }
    tempErrors.first_name = formData.first_name ? "" : "First name is required"
    tempErrors.last_name = formData.last_name ? "" : "Last name is required"
    tempErrors.email =
      formData.email && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)
        ? ""
        : "Email is required or not valid"
    tempErrors.password = formData.password ? "" : "Password is required"
    tempErrors.password_confirmation =
      formData.password === formData.password_confirmation
        ? ""
        : "Passwords do not match"

    setErrors(tempErrors)
    return Object.values(tempErrors).every((x) => x === "")
  }

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (validate()) {
      await registerUser(formData).unwrap()
    }
  }

  const RegistrationFormHeader = `RegistrationHeader`

  useEffect(() => {
    if (isSuccess) {
      navigate("/login")
    }
  }, [isSuccess, navigate])

  // if (isLoading) {
  //   return <div>Loading...</div>
  // }

  if (isError) {
    return <div>Error: {error?.data.message}</div>
  }

  return (
    <>
      <Header
        customClassName={RegistrationFormHeader}
        level={3}
        text="Registration Form"
      />
      <form className="RegistrationForm" onSubmit={handleSubmit}>
        <InputField
          type="text"
          name="first_name"
          value={formData.first_name}
          onChange={handleChange}
          placeholder="First Name"
          error={errors.first_name}
        />
        <InputField
          type="text"
          name="last_name"
          value={formData.last_name}
          onChange={handleChange}
          placeholder="Last Name"
          error={errors.last_name}
        />
        <InputField
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Email"
          error={errors.email}
        />
        <InputField
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="Password"
          error={errors.password}
        />
        <InputField
          type="password"
          name="password_confirmation"
          value={formData.password_confirmation}
          onChange={handleChange}
          placeholder="Password Confirmation"
          error={errors.password_confirmation}
        />
        <Button type="submit" disabled={isLoading}>
          {isLoading ? "Registering..." : "Register"}
        </Button>
      </form>
      {isSuccess && <h4 className="">Successfully Registered</h4>}
      {isError && <div>Error: {error?.data.message}</div>}
      <Link className="RegistrationForm" to="/login">
        Already have an account? Log in here.
      </Link>
    </>
  )
}

export default RegistrationForm
