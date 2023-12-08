import "./App.scss"
import Navigation from "./components/Navigation/Navigation"
import RegistrationForm from "./components/RegistrationForm"

function App() {
  return (
    <>
      <Navigation />
      <div className="App">
        <RegistrationForm />
      </div>
    </>
  )
}

export default App
