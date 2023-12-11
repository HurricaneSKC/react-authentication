import React, { useState, ChangeEvent, FormEvent, useEffect } from "react"
import InputField from "../Input/InputField"
import Button from "../Button/Button"
import { useLoginUserMutation } from "../../services/authApi"
import { useNavigate, Link } from "react-router-dom"
import "./LoginForm.scss"

interface LoginFormProps {
  onLoginSuccess: () => void
}

const LoginForm: React.FC<LoginFormProps> = ({ onLoginSuccess }) => {
  const [formData, setFormData] = useState({ email: "", password: "" })
  const [loginErrors, setLoginErrors] = useState({ email: "", password: "" })
  const [errors, setErrors] = useState()
  const [loginUser, { isLoading, isSuccess, isError, error }] =
    useLoginUserMutation()
  const navigate = useNavigate()

  console.log("IsLogin", isSuccess)

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
    setLoginErrors({ email: "", password: "" })
  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (validate()) {
      try {
        const userData = await loginUser(formData).unwrap()
        console.log("authToken", userData)
        localStorage.setItem("authenticationToken", userData.token)
      } catch (error) {
        setErrors(error?.data?.message || "Failed to log in.")
      }
    }
  }

  const validate = () => {
    let tempErrors = { ...loginErrors }
    tempErrors.email =
      formData.email && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)
        ? ""
        : "Email is required or not valid"
    tempErrors.password = formData.password ? "" : "Password is required"
    setLoginErrors(tempErrors)
    return Object.values(tempErrors).every((x) => x === "")
  }

  useEffect(() => {
    console.log("Is Login Successful?", isSuccess)
    if (isSuccess) {
      onLoginSuccess()
      navigate("/users")
    }

    if (isError) {
      setErrors(error?.data?.message || "Failed to log in.")
    }
  }, [error, isError, isSuccess, navigate, onLoginSuccess])

  return (
    <>
      <form className="LoginForm" onSubmit={handleSubmit}>
        <InputField
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Email"
          error={loginErrors.email}
        />
        <InputField
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="Password"
          error={loginErrors.password}
        />
        <Button type="submit">{isLoading ? "Logging in..." : "Login"}</Button>
        {errors && <div className="error-message">{error?.data.message}</div>}
      </form>
      <Link className="LoginForm" to="/register">
        Don't have an account? Register here.
      </Link>
    </>
  )
}

export default LoginForm
