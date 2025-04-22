import React from 'react'
import { Routes, Route } from 'react-router-dom'
import RegisterPage from './pages/RegisterPage'
import HomePage from './pages/HomePage'

const App = () => {
  return (
    <>
      <Routes>
        <Route path='/register' element={<RegisterPage />} />
        <Route path='/' element={<HomePage />} />
      </Routes>
    </>
  )
}

export default App
