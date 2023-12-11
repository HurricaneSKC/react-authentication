import React from "react"
import { render, screen, waitFor } from "@testing-library/react"
import userEvent from "@testing-library/user-event"

import { Provider } from "react-redux"
import { store } from "../../services/store"
import { MemoryRouter } from "react-router-dom"
import RegistrationForm from "./RegistrationForm"

test("renders registration form elements", () => {
  render(
    <Provider store={store}>
      <MemoryRouter>
        <RegistrationForm />
      </MemoryRouter>
    </Provider>,
  )

  expect(screen.getByPlaceholderText("First Name")).toBeInTheDocument()
  expect(screen.getByPlaceholderText("Last Name")).toBeInTheDocument()
  expect(screen.getByPlaceholderText("Email")).toBeInTheDocument()
  expect(screen.getByPlaceholderText("Password")).toBeInTheDocument()
  expect(
    screen.getByPlaceholderText("Password Confirmation"),
  ).toBeInTheDocument()
  expect(screen.getByRole("button", { name: /register/i })).toBeInTheDocument()
})

test("validation shows error messages for invalid inputs", async () => {
  render(
    <Provider store={store}>
      <MemoryRouter>
        <RegistrationForm />
      </MemoryRouter>
    </Provider>,
  )

  const submitButton = screen.getByRole("button", { name: /register/i })

  // Attempt to submit the form with empty fields
  userEvent.click(submitButton)

  // Check for error messages
  await waitFor(() => {
    expect(screen.getByText(/First name is required/i)).toBeInTheDocument()
  })
  await waitFor(() => {
    expect(screen.getByText(/Last name is required/i)).toBeInTheDocument()
  })
  await waitFor(() => {
    expect(
      screen.getByText(/Email is required or not valid/i),
    ).toBeInTheDocument()
  })
  await waitFor(() => {
    expect(screen.getByText(/Password is required/i)).toBeInTheDocument()
  })
})
