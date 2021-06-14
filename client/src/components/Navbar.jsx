import React, {useContext} from 'react'
import {Lock, Unlock, Trash} from 'react-bootstrap-icons'
import {Link, useHistory} from 'react-router-dom'
import {AuthContext} from './../context/AuthContext'
import axios from 'axios'

export const Navbar = () => {
  const history = useHistory()
  const {logout, checked, setChecked} = useContext(AuthContext)

  const logautHandler = event => {
    event.preventDefault()
    logout()
    history.push('/')
  }

  const handelClickLock = async () => {
    const response = await axios.put(`api/users/lock`, {
      checkedIds: checked
    })
    const ar = []
    setChecked(ar)
    console.log(11)
  }

  const handelClickUnlock = async() => {
    const response = await axios.put(`api/users/unlock`, {
      checkedIds: checked
    })
    setChecked([])
  }


  return (
    <nav className="navbar navbar-light bg-light">
      <div className="container justify-content-start">
        <button className="navbar-brand" onClick={handelClickLock}><Lock /></button>
        <button className="navbar-brand" onClick={handelClickUnlock}><Unlock /></button>
        <Link className="navbar-brand" to='#'><Trash /></Link>
        <a className="navbar-brand" onClick={logautHandler} href="#">Выйти</a>
      </div>
    </nav>
  )
}