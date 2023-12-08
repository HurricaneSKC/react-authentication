import React, { ChangeEvent, FormEvent, useState } from "react"
import InputField from "../Input/InputField"
import Button from "../Button/Button"
import "./RegistrationForm.scss"
import Header from "../Header/Header"

const RegistrationForm = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    passwordConfirmation: "",
  })

  const [errors, setErrors] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    passwordConfirmation: "",
  })

  const validate = () => {
    let tempErrors = { ...errors }
    tempErrors.firstName = formData.firstName ? "" : "First name is required"
    tempErrors.lastName = formData.lastName ? "" : "Last name is required"
    tempErrors.email = formData.email ? "" : "Email is required"
    tempErrors.email = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)
      ? ""
      : "Email is not valid"
    tempErrors.password = formData.password ? "" : "Password is required"
    tempErrors.passwordConfirmation =
      formData.password === formData.passwordConfirmation
        ? ""
        : "Passwords do not match"

    setErrors(tempErrors)
    return Object.values(tempErrors).every((x) => x === "")
  }

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (validate()) {
      console.log(formData)
    }
  }

  const RegistrationFormHeader = `RegistrationHeader`
  const RegistrationButton = `RegistrationButton`

  return (
    <>
      <Header
        customClassName={RegistrationFormHeader}
        level={3}
        text="Registration Form"
      />
      <form className="Form" onSubmit={handleSubmit}>
        <InputField
          type="text"
          name="firstName"
          value={formData.firstName}
          onChange={handleChange}
          placeholder="First Name"
          error={errors.firstName}
        />
        <InputField
          type="text"
          name="lastName"
          value={formData.lastName}
          onChange={handleChange}
          placeholder="Last Name"
          error={errors.lastName}
        />
        <InputField
          type="text"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Email"
          error={errors.email}
        />
        <InputField
          type="text"
          name="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="Password"
          error={errors.password}
        />
        <InputField
          type="text"
          name="passwordConfirmation"
          value={formData.passwordConfirmation}
          onChange={handleChange}
          placeholder="Password Confirmation"
          error={errors.passwordConfirmation}
        />
      </form>
      <Button customClassName={RegistrationButton} type="submit">
        Register
      </Button>
    </>
  )
}

export default RegistrationForm
