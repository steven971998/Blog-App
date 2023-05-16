import React, { useContext } from 'react'
import Login from './components/pages/login/Login'
import Register from './components/pages/register/Register'
import Home from './components/pages/home/Home'
import Settings from './components/pages/settings/Settings'
import Single from './components/pages/single/Single'
import Write from './components/pages/write/Write'
import Topbar from './components/topbar/Topbar'

import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import { Context } from './context/Context'


const App = () => {
  const {user} = useContext(Context) 
  return (
    <>
    <Router>
    <Topbar/>
    <Routes>
      <Route exact path='/' element={<Home/>}></Route>
      <Route exact path='/register' element={user? <Home/> : <Register/>}></Route> {/* If user has loggedIn then he will be directed to Homepage else he will be directed to Register Page. */}
      <Route exact path='/login'  element={user? <Home/> :<Login/>}></Route>
      <Route exact path='/settings' element={user? <Settings/> :<Login/>}></Route>
      <Route exact path='/write' element={user? <Write/> : <Login/>}></Route> {/* If user is loggedIn then he can write. */}
      <Route exact path='/post/:postId' element={<Single/>}></Route>
    </Routes>

    </Router>
    </>
  )
}

export default App