import react from 'react'
import {Switch, Route, Redirect} from 'react-router-dom'
import {ListPage} from './pages/ListPage.jsx'
import {SignIn} from './pages/SignIn'
import {SignUp} from './pages/SignUp'
import {Navbar} from './components/Navbar.jsx'

export const useRoutes = isAuthenticated => {
  if (isAuthenticated) {
    return (
      <Switch>
        <Route path="/list" exact>
          <Navbar />
          <ListPage />
        </Route>
        <Redirect to="/list" />
      </Switch>
    )
  }
  return (
    <Switch>
      <Route path="/" exact>
        <SignIn />
      </Route>
      <Route path="/signup" exact>
        <SignUp />
      </Route>
      <Redirect to="/" />
    </Switch>
  )
}