import React, { Component, Suspense } from 'react'
import { HashRouter, Route, Routes } from 'react-router-dom'
import './scss/style.scss'

const loading = (
  <div className="pt-3 text-center">
    <div className="sk-spinner sk-spinner-pulse"></div>
  </div>
)

// Containers
const DefaultLayout = React.lazy(() => import('./layout/DefaultLayout'))

// Pages
const Login = React.lazy(() => import('./views/pages/login/Login'))
const Register = React.lazy(() => import('./views/pages/register/Register'))
const Signout = React.lazy(() => import('./views/pages/signout/Signout'))
const Users = React.lazy(() => import('./views/users/Users'))
const Page404 = React.lazy(() => import('./views/pages/page404/Page404'))

class App extends Component {
  render() {
    return (
      <HashRouter>
        <Suspense fallback={loading}>
          <Routes>
            <Route exact path="/login" name="Login Page" element={<Login />} />
            <Route exact path="/signout" name="Login Page" element={<Signout />} />
            {/* <Route exact path="/register" name="Register Page" element={<Register />} />
            <Route exact path="/users" name="Users Page" element={<Users />} /> */}
            <Route exact path="/404" name="Page 404" element={<Page404 />} />
            <Route path="*" name="Home" element={<DefaultLayout />} />
          </Routes>
        </Suspense>
      </HashRouter>
    )
  }
}

export default App
