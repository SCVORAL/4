import React, {useState, useEffect, useContext} from 'react'
import {NavLink} from 'react-router-dom'
import {useHttp} from './../hooks/http.hook'
import {useMessage} from './../hooks/message.hook'
import {AuthContext} from './../context/AuthContext'

export const SignIn = () => {

  const auth = useContext(AuthContext)

  const message = useMessage()
  const {loading, error, request, clearError} = useHttp()
  const [form, setForm] = useState({
    email: '',
    password: ''
  })

  useEffect( () => {
    message(error)
    clearError()
  }, [error, message, clearError])

  const changeHandler = event => {
    setForm({ ...form, [event.target.name]: event.target.value })
  }

  const loginHandler = async () => {
    try {
      const data = await request('api/auth/login', 'POST', {...form})
      if(data.userStatus) {
        auth.login(data.token, data.userId)
      } else {
        alert('Пользователь заблокирован')
      }
    } catch (e) {}
  } 

  return(
    <div className="row justify-content-center align-items-center">
      <div className="col-6">
        <div className="mb-3">
          <label className="form-label">Email address</label>
          <input type="email" className="form-control" name="email" onChange={changeHandler}/>
        </div>
        <div className="mb-3">
          <label className="form-label">Password</label>
          <input type="password" className="form-control" name="password" onChange={changeHandler}/>
        </div>
        <button 
          type="submit" 
          className="btn btn-primary"
          disabled={loading}
          onClick={loginHandler}
        >
          Login
        </button>
        <NavLink className="btn btn-primary ms-3" to="/signup">Sign Up</NavLink>
      </div>
    </div>
  )
}