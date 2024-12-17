import { useState } from 'react'
import LoginPage from './components/LoginPage'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <p>Hello World</p>
      <LoginPage></LoginPage>
    </>
  )
}

export default App; 
