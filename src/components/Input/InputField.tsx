import React, { ChangeEvent } from "react"
import "./InputField.scss"

interface InputFieldProps {
  type: string
  name: string
  value: string
  placeholder?: string
  onChange: (e: ChangeEvent<HTMLInputElement>) => void
  error?: string
}

const InputField: React.FC<InputFieldProps> = ({
  type,
  name,
  value,
  placeholder,
  onChange,
  error,
}) => {
  const classList = `Input ${error ? "error" : ""}`
  return (
    <>
      <input
        type={type}
        name={name}
        value={value}
        placeholder={placeholder}
        onChange={onChange}
        className={classList}
      />
      {error && <p className="error-message">{error}</p>}
    </>
  )
}

export default InputField
