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

  function camelCaseToNormal(str: string) {
    const result = str.replace(/([A-Z])/g, " $1").trim()
    return result.charAt(0).toUpperCase() + result.slice(1)
  }
  const labelName = camelCaseToNormal(name)

  return (
    <>
      <label htmlFor={name} className="visually-hidden">
        {labelName}
      </label>
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
