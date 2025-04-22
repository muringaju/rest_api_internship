import React from 'react'
import { Link } from 'react-router-dom'

const HomePage = () => {
  return (
    <div>
      Home page
      <Link to={'/register'}>Register Now</Link>
    </div>
  )
}

export default HomePage
