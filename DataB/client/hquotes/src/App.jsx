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
import AddQuote from './Components/AddQuote'
import { useAuth0 } from '@auth0/auth0-react'

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
        
      </Route>
    </Routes>
    
    </BrowserRouter>
  
  )
}


