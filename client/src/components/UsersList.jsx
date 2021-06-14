import React, {useState, useEffect, useContext} from 'react'
import {AuthContext} from './../context/AuthContext'
import {Lock, Unlock} from 'react-bootstrap-icons'
import axios from 'axios'

const UsersList = ({ links }) => {
  const {checked, setChecked} = useContext(AuthContext)

  const handelChangeCheckBox = (id) => {
    const listChecked = checked
    if (listChecked.length === 0){
      listChecked.push(id)
    } else {
      listChecked.map((idMap, i) => {
        if(idMap === id){
          listChecked.splice(i, 1)
        } else {
          listChecked.push(id)
        }
      })
    }
    setChecked(listChecked)
  }

  return (
    <table className="table" a={console.log('rerendered UsersList')}>
      <thead>
        <tr>
          <th scope="col"><input type="checkbox" /></th>
          <th scope="col">#</th>
          <th scope="col">Name</th>
          <th scope="col">E-mail</th>
          <th scope="col">Register Date</th>
          <th scope="col">Last Login Date</th>
          <th scope="col">Status</th>
        </tr>
      </thead>
      <tbody>
        { links.map(link => 
          (
            <tr key={link._id}>
              <td><input type="checkbox" onChange={() => handelChangeCheckBox(link._id)}/></td>
              <td>{link._id}</td>
              <td>{link.name}</td>
              <td>{link.email}</td>
              <td>{link.registerDate}</td>
              <td>{link.loginDate}</td>
              <td>{link.status ? <Unlock /> : <Lock />}</td>
              <td></td>
            </tr>
          )
        ) }
      </tbody>
    </table>
  )
}

export default UsersList;
