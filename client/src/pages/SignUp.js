import React, {useState, useEffect, useContext} from 'react'
import {useHttp} from './../hooks/http.hook'
import {NavLink} from 'react-router-dom'
import {useMessage} from './../hooks/message.hook'
import {AuthContext} from './../context/AuthContext'

export const SignUp = () => {

  const auth = useContext(AuthContext)

  const message = useMessage()
  const {loading, error, request, clearError} = useHttp()
  const [form, setForm] = useState({
    email: '',
    name: '',
    password: ''
  })

  useEffect( () => {
    message(error)
    clearError()
  }, [error, message, clearError])

  const changeHandler = event => {
    setForm({ ...form, [event.target.name]: event.target.value })
  }

  const registerHandler = async () => {
    try {
      const data = await request('api/auth/register', 'POST', {...form})
      auth.login(data.token, data.userId)
      alert(data.message)
    } catch (e) {}
  } 

  return(
    <div className="row justify-content-center align-items-center">
      <div className="col-6">
        <div className="mb-3">
          <label className="form-label">Name</label>
          <input 
            type="name" 
            className="form-control" 
            name="name" 
            onChange={changeHandler}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Email address</label>
          <input 
            type="email" 
            className="form-control" 
            name="email" 
            onChange={changeHandler}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Password</label>
          <input 
            type="password" 
            className="form-control" 
            name="password" 
            onChange={changeHandler}
          />
        </div>
        <button 
          type="submit" 
          className="btn btn-primary"
          onClick={registerHandler}
          disabled={loading}
        >
          Register
        </button>
        <NavLink className="btn btn-primary ms-3" to="/">Back to Login</NavLink>
      </div>
    </div>
  )
}