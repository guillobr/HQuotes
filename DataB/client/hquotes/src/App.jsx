import { useState } from 'react'
import { useSelector } from 'react-redux'
import reactLogo from './assets/react.svg'
import './App.css'
import React from 'react'
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  Outlet,
} from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { useEffect } from 'react'
import { getQuotes , postUser , getUsers} from './actions'
import Home from './Components/Home'
import LandingPage from './Components/LandingPage'
import NavBar from './Components/NavBar'
import LogInButton from './Components/LogIn'
import AddQuote from './Components/Admin/Add/AddQuote'
import Profile from './Components/User/Profile'
import { useAuth0 } from '@auth0/auth0-react'
import { Admin } from './Components/Admin/Admin'
import Add from './Components/Admin/Add/Add'
import Put from './Components/Admin/User/Users'
import Delete from './Components/Admin/Delete/Delete'
import Users from './Components/Admin/User/Users'
import AddAuthor from './Components/Admin/Add/AddAuthor'


export default function App() {

  const dispatch = useDispatch()

  const { user } = useAuth0()

  useEffect(() => {
    dispatch(getQuotes())
  }, [dispatch])

  useEffect(() => {
    dispatch(getUsers())
  }, [dispatch])

  useEffect(() => {
    if (user) {
      dispatch(postUser(user))
    }
  }, [user])

  const usuario = useSelector((state) => state.userLogged)


  
  return (
    
    <BrowserRouter>
    <NavBar/>
    
    <Routes>
      <Route>
        
        <Route path='/' element={<LandingPage />} />
        <Route path='/home' element={<Home />} />
        <Route path='/addQuote' element={<AddQuote/>} />
        <Route path='/user' element={<Profile/>} />
        <Route path='/admin' element={<Admin/>} />
        <Route path='/add' element={<Add/>} />
        <Route path='/put' element={<Put/>} />
        <Route path='/delete' element={<Delete/>} />
        <Route path='/adminusers' element={<Users/>} />
        <Route path='/addauthor' element={<AddAuthor/>} />
        <Route path='/addquote' element={<AddQuote/>} />
        
      </Route>
    </Routes>
    
    </BrowserRouter>
  
  )
}


