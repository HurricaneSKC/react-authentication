import React from "react"
import "./Button.scss"

interface ButtonProps {
  children: React.ReactNode
  onClick?: () => void
  type?: "button" | "submit" | "reset"
  customClassName?: string
}

const Button: React.FC<ButtonProps> = ({
  children,
  onClick,
  type = "button",
  customClassName,
}) => {
  const className = `btn ${customClassName}`
  return (
    <button className={className} type={type} onClick={onClick}>
      {children}
    </button>
  )
}

export default Button
