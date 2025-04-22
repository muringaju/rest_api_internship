import { useState, useEffect } from 'react'
import axios from 'axios'

const RegisterPage = () => {
    const [username, setUsername] = useState() // state for storing username value
    const [password, setPassword] = useState()
    const [userRole, setUserRole] = useState()
    const [loading, setLoading] = useState(false)


    // set data to backend and call register api

    const registerUser = async (e) => {
        e.preventDefault()
        setLoading(true)

        // request body
        const data = {
            "username": username,
            "password": password,
            "role": userRole
        }

        try {
            const response = await axios.post('http://localhost:5000/api/auth/register', data)
            setLoading(false)
            return response.data
        } catch(error) {
            console.log(`Error: ${error}`)
            setLoading(false)
            return
        }
    }


    const handleUserNameChange = (e) => {
        setUsername(e.target.value)
    }


    const handlePasswordChange = (e) => {
        setPassword(e.target.value)
    }

    const handleUserTypeChange = (e) => {
        setUserRole(e.target.value)
    }


    //console.log(`Usertype: ${userRole}`) // Template literals


  return (
    <div>
      Register Page
      <form onSubmit={registerUser}>
        <div>
            <input type="text" onChange={handleUserNameChange} value={username} placeholder='Username' />
        </div>
        <div>
            <input type="text" onChange={handlePasswordChange} placeholder='Password' />
        </div>
        User type
        <div>
            <label htmlFor="user">User</label>
            <input type="radio" onChange={handleUserTypeChange} value={'user'} name='user' id='user' />
        </div>
        <div>
            <label htmlFor="admin">Admin</label>
            <input type="radio" onChange={handleUserTypeChange} value={'admin'} name='user' id='admin' />
        </div>
        <button type='submit'>Register user
            {loading && 
            <div className='loader'></div>
            }
        </button>
      </form>
    </div>
  )
}

export default RegisterPage
