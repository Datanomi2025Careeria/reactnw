import '../App.css'
import React, { useState } from 'react'
import LoginService from '../services/Auth'
import md5 from 'md5'

const Login = ({ setIsPositive, setMessage, setShowMessage, setLoggedInUser, setAccessLevel }) => {

  // Komponentin tilan määritys
  const [userName, setUserName] = useState('')
  const [password, setPassword] = useState('')
  const [isDisabled, setIsDisabled] = useState(false)

  const EmptyForm = () => {
    setPassword('')
    setUserName('')
  }

  // onSubmit tapahtumankäsittelijä funktio
  const handleSubmit = (event) => {
    event.preventDefault()
    setIsDisabled(true)
    var userForAuth = {
      userName: userName,
      password: md5(password),
    }

    LoginService.authenticate(userForAuth)
      .then(response => {
        console.log(response.status + ": " + response.statusText);
        console.log(response.data);
        if ([200, 201].includes(response.status)) {

          localStorage.setItem('username', response.data.username)
          localStorage.setItem('token', response.data.token)
          localStorage.setItem('accessLevel', response.data.accesslevelId)
          setLoggedInUser(response.data.username)
          setAccessLevel(response.data.accesslevelId)

          setMessage("Logged is as: " + userForAuth.userName + (response.data.accesslevelId === 1 ? "(Admin)" : "(User)"))
          setIsPositive(true)
          setShowMessage(true)

          setTimeout(() => {
            setShowMessage(false)
            setIsDisabled(false)
            EmptyForm()
          }, 5000)
        }

      })
      .catch(error => {
        let backendMessage = "";
        if (error.response) {
          backendMessage = error.response.data?.message || JSON.stringify(error.response.data);
        } else if (error.request) {
          backendMessage = "No response from server";
        } else {
          backendMessage = error.message;
        }
        setMessage(backendMessage)
        setIsPositive(false)
        setShowMessage(true)

        setTimeout(() => {
          setShowMessage(false)
          setIsDisabled(false)
          EmptyForm()
        }, 6000)
        setIsDisabled(false)
      })
  }

  return (
    <div id="loginForm">
      <h2>Login</h2>

      <form onSubmit={handleSubmit}>
        <div>
          <input type="text" value={userName} placeholder="Username"
            disabled={isDisabled} onChange={({ target }) => setUserName(target.value)} />
        </div>
        <div>
          <input type="password" value={password} placeholder="Password"
            disabled={isDisabled} onChange={({ target }) => setPassword(target.value)} />
        </div>

        <input type='submit' value='Login' />
        <input type='button' value='Empty' onClick={EmptyForm} />
      </form>

    </div>
  )
}

export default Login
