import React, {useState} from 'react'
import {useRoutes} from './routes'
import {useAuth} from './hooks/auth.hook'
import {BrowserRouter as Router} from 'react-router-dom'
import {AuthContext} from './context/AuthContext'
import 'bootstrap'

function App() {
  const {token, login, logout, userId} = useAuth()
  const [checked, setChecked] = useState([])
  const isAuthenticated = !!token
  const routes = useRoutes(isAuthenticated)

  const handleClick = () => {
    console.log(checked)
    setChecked([])
    console.log(checked)
  }

  return (
    <AuthContext.Provider value={{
      token, login, logout, userId, isAuthenticated, checked, setChecked
    }}>
      <button onClick={handleClick}>dfxfdgh</button>
      <Router>
        <div className='container' a={console.log('rerendered app')}>
          {routes}
        </div>
      </Router>
    </AuthContext.Provider>
  )
}

export default App
