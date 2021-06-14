import React, {useCallback, useState, useContext, useEffect} from 'react'
import {AuthContext} from '../context/AuthContext'
import UsersList from './../components/UsersList'
import axios from 'axios'

export const ListPage = () => {
  const {checked, users, setUsers} = useContext(AuthContext)


  const fetchUsers = async () => {
    const response = await axios.get(`api/users/index`);
    setUsers(response.data)
  }

  useEffect (() => {
    fetchUsers()
  }, [users])

  return(
    <>
      <UsersList links={users}/>
    </>
  )
}