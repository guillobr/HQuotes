import { useState } from 'react'
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
import { getQuotes } from './actions'
import Home from './Components/Home'
import LandingPage from './Components/LandingPage'
import NavBar from './Components/NavBar'

export default function App() {

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getQuotes())
  }, [dispatch])


  
  return (
    
    <BrowserRouter>
    <NavBar/>
    
    <Routes>
      <Route>
        
        <Route path='/' element={<LandingPage />} />
        <Route path='/home' element={<Home />} />
        
      </Route>
    </Routes>
    
    </BrowserRouter>
  
  )
}


