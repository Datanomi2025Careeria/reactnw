import React, { useState, useEffect } from 'react'
import './App.css'
import Laskuri from './components/Laskuri'
import Posts from './components/Posts'
import CustomerList from './components/customers/CustomerList'
import UserList from './components/users/UserList'
import Message from './components/Message'
import Login from './components/Login'
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import 'bootstrap/dist/css/bootstrap.min.css';

import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom'

const App = () => {

  // App komponentin tila
  // Statet messagen näyttämistä varten
  const [showMessage, setShowMessage] = useState(false)
  const [message, setMessage] = useState('')
  const [isPositive, setIsPositive] = useState(false)
  const [loggedInUser, setLoggedInUser] = useState('')
  const [accessLevel, setAccessLevel] = useState(0)

  useEffect(() => {
    const loggedUser = localStorage.getItem('username')
    if (loggedUser) {
      setLoggedInUser(loggedUser)
      setAccessLevel(parseInt(localStorage.getItem('accessLevel') || '0'))
    }
  }, [])

  const logout = () => {
    localStorage.clear()
    setLoggedInUser('')
  }

  return (
    <div className="App">

      {showMessage && <Message message={message} isPositive={isPositive} />}

      {!loggedInUser &&
        < Login
          setIsPositive={setIsPositive}
          setMessage={setMessage}
          setShowMessage={setShowMessage}
          setLoggedInUser={setLoggedInUser}
          setAccessLevel={setAccessLevel}
        />
      }

      {loggedInUser &&
        <Router>
          {<Navbar bg="dark" variant="dark">
            <Nav className="mr-auto">
              <Link to={'/Customers'} className='nav-link'>Customers</Link>
              {accessLevel === 1 &&
                <Link to={'/Users'} className='nav-link'>Users</Link>
              }
              <Link to={'/Laskuri'} className='nav-link'>Laskuri</Link>
              <Link to={'/Posts'} className='nav-link'>Posts</Link>
              <button onClick={logout} className='nav-link btn btn-link'>
                Logout ({loggedInUser} - {accessLevel === 1 ? "admin" : "user"})
              </button>
            </Nav>
          </Navbar>
          }
          <h2>Northwind Traders</h2>

          <Routes>
            <Route path='/Customers' element={
              <CustomerList
                setIsPositive={setIsPositive}
                setShowMessage={setShowMessage}
                setMessage={setMessage}
              />}
            />
            {accessLevel === 1 &&
              <Route path='/Users' element={
                <UserList
                  setIsPositive={setIsPositive}
                  setShowMessage={setShowMessage}
                  setMessage={setMessage}
                />}
              />
            }
            <Route path='/Laskuri' element={
              <Laskuri />}
            />
            <Route path='/Posts' element={
              <Posts />}
            />
          </Routes>
        </Router>
      }

    </div>
  )
}

export default App
