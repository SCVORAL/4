import React, {useContext, useState} from 'react'
import {Lock, Unlock, Trash} from 'react-bootstrap-icons'
import {Link, useHistory} from 'react-router-dom'
import {AuthContext} from './../context/AuthContext'
import axios from 'axios'

export const Navbar = () => {
  const history = useHistory()
  const {logout, checked, setChecked, setUsers} = useContext(AuthContext)

  const logautHandler = event => {
    event.preventDefault()
    logout()
    history.push('/')
  }

  const handelClickLock = async () => {
    
    const { data } = await axios.put(`api/users/lock`, {
      checkedIds: checked
    })

    setUsers(data)

    const stor = JSON.parse(localStorage.getItem('userData')).userId

    checked.map( item => {
      if(item === stor){
        setChecked([])
        logout()
        history.push('/')
      }
    })

  }

  const handelClickUnlock = async() => {
    const { data } = await axios.put(`api/users/unlock`, {
      checkedIds: checked
    })

    setUsers(data)
  }

  const handelClickTrash = async() => {
    const { data } = await axios.delete(`api/users/delete`, {
      data: checked
    })

    setUsers(data)

    const stor = JSON.parse(localStorage.getItem('userData')).userId

    checked.map( item => {
      if(item === stor){
        setChecked([])
        logout()
        history.push('/')
      }
    })
    
  }


  return (
    <nav className="navbar navbar-light bg-light">
      <div className="container justify-content-start">
        <button className="navbar-brand" onClick={handelClickLock}><Lock /></button>
        <button className="navbar-brand" onClick={handelClickUnlock}><Unlock /></button>
        <button className="navbar-brand" onClick={handelClickTrash}><Trash /></button>
        <a className="navbar-brand" onClick={logautHandler} href="#">Выйти</a>
      </div>
    </nav>
  )
}