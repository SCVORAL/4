import React, {useCallback, useState, useContext, useEffect} from 'react'
import {AuthContext} from '../context/AuthContext'
import UsersList from './../components/UsersList'
import axios from 'axios'

export const ListPage = () => {
  const [users, setUsers] = useState([])
  const {checked} = useContext(AuthContext)


  const fetchUsers = async () => {
    const response = await axios.get(`api/users/index`);
    setUsers(response.data)
  }

  // setInterval(fetchUsers(), 4000)

  useEffect (() => {
    fetchUsers()
    console.log(checked)
  }, [checked])

  return(
    <>
      <UsersList links={users} a={console.log('rerendered listPage')}/>
    </>
  )
}