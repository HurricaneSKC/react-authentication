import React from "react"
import "./Button.scss"

interface ButtonProps {
  children: React.ReactNode
  onClick?: () => void
  type?: "button" | "submit" | "reset"
  customClassName?: string
  disabled?: boolean
}

const Button: React.FC<ButtonProps> = ({
  children,
  onClick,
  type = "button",
  customClassName,
  disabled = false,
}) => {
  const className = `btn ${customClassName} ${disabled ? "btn-disabled" : ""}`
  return (
    <button
      className={className}
      type={type}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  )
}

export default Button
