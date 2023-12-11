import React from "react"
import { render, screen } from "@testing-library/react"
import { MemoryRouter } from "react-router-dom"
import { Provider } from "react-redux"
import { store } from "./services/store"
import App from "./App"

test("renders navigation component", () => {
  render(
    <Provider store={store}>
      <MemoryRouter>
        <App />
      </MemoryRouter>
    </Provider>,
  )

  // Replace this with an actual text or element you expect to render in the App
  expect(screen.getByText(/Some Logo/i)).toBeInTheDocument()
})

test("renders login form for /login route", () => {
  render(
    <Provider store={store}>
      <MemoryRouter initialEntries={["/login"]}>
        <App />
      </MemoryRouter>
    </Provider>,
  )

  expect(screen.getByPlaceholderText(/Email/i)).toBeInTheDocument()
  expect(screen.getByPlaceholderText(/Password/i)).toBeInTheDocument()
})

test("redirects from protected route to login if not authenticated", () => {
  render(
    <Provider store={store}>
      <MemoryRouter initialEntries={["/users"]}>
        <App />
      </MemoryRouter>
    </Provider>,
  )

  // Assuming you have a text element on the login page to check for
  expect(screen.getByPlaceholderText(/Email/i)).toBeInTheDocument()
  expect(screen.getByPlaceholderText(/Password/i)).toBeInTheDocument()
})
