import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import {BrowserRouter,Routes,Route } from 'react-router-dom'
import './App.css'
import Login from './Login'
import Signup from './Signup'
import AdminDashboard from './AdminDashboard'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/admin-login" element={<Login />} />
          <Route path="/" element={<Signup />} />
          <Route path="/admin-dashboard" element={<AdminDashboard />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
