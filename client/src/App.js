import React, {useState} from 'react'
import {useRoutes} from './routes'
import {useAuth} from './hooks/auth.hook'
import {BrowserRouter as Router} from 'react-router-dom'
import {AuthContext} from './context/AuthContext'
import 'bootstrap'

function App() {
  const {token, login, logout, userId} = useAuth()
  const [checked, setChecked] = useState([])
  const [users, setUsers] = useState([])
  const isAuthenticated = !!token
  const routes = useRoutes(isAuthenticated)

  return (
    <AuthContext.Provider value={{
      token, login, logout, userId, isAuthenticated, checked, setChecked, users, setUsers
    }}>
      <Router>
        <div className='container'>
          {routes}
        </div>
      </Router>
    </AuthContext.Provider>
  )
}

export default App
