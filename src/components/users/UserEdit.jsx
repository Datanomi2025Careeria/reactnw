import '../../App.css'
import React, { useState } from 'react'
import UserService from '../../services/User'
import md5 from 'md5'
import 'bootstrap/dist/css/bootstrap.min.css'

let tableHeaders = ['First Name', 'Last Name', 'Email', 'Username', 'Password', 'Access']
let tableFields = ['firstname', 'lastname', 'email', 'username', 'password', 'accesslevelId']
let okStatuses = [200, 201, 202, 203, 204]

const UserEdit = ({ setMuokkaustila, setIsPositive, setMessage, setShowMessage, muokattava }) => {

  // Komponentin tilan määritys
  const [newUserId, setNewUserId] = useState(muokattava.userId)
  const [newFirstName, setNewFirstName] = useState(muokattava.firstname)
  const [newLastName, setNewLastName] = useState(muokattava.lastname)
  const [newUserName, setNewUserName] = useState(muokattava.username)

  const [newEmail, setNewEmail] = useState(muokattava.email)
  const [newPassword, setNewPassword] = useState(muokattava.password)
  const [newAccessLevelId, setNewAccessLevelId] = useState(muokattava.accesslevelId)


  // onSubmit tapahtumankäsittelijä funktio
  const handleSubmit = (event) => {
    event.preventDefault()
    var newUser = {
      userId: newUserId,
      firstName: newFirstName,
      lastName: newLastName,
      userName: newUserName,
      email: newEmail,
      password: md5(newPassword),
      accessLevelId: newAccessLevelId
    }

    UserService.update(newUser)
      .then(response => {
        console.log(response.status)
        if (okStatuses.includes(response.status)) {
          setMessage("Updated User: " + newUser.userName)
          setIsPositive(true)
          setShowMessage(true)

          setTimeout(() => {
            setShowMessage(false)
          }, 5000)

          setMuokkaustila(false)
        }

      })
      .catch(error => {
        setMessage(error.message)
        setIsPositive(false)
        setShowMessage(true)

        setTimeout(() => {
          setShowMessage(false)
        }, 6000)
      })
  }

  return (
    <div id="addNew">
      <h2>{newUserName.toUpperCase()}</h2>
      <div className="form-container">
        <form onSubmit={handleSubmit}>
          <div class="mb-3">
            <label class="form-label">Firstname</label>
            <input className='form-control' type="text" value={newFirstName} placeholder="Firstname"
              onChange={({ target }) => setNewFirstName(target.value)} required />
          </div>
          <div class="mb-3">
            <label class="form-label">Lastname</label>
            <input className='form-control' type="text" value={newLastName} placeholder="Lastname"
              onChange={({ target }) => setNewLastName(target.value)} />
          </div>
          <div class="mb-3">
            <label class="form-label">Email</label>
            <input className='form-control' type="email" value={newEmail} placeholder="Email"
              onChange={({ target }) => setNewEmail(target.value)} />
          </div>
          <div class="mb-3">
            <label class="form-label">Username</label>
            <input className='form-control' type="text" value={newUserName} placeholder="Username"
              onChange={({ target }) => setNewUserName(target.value)} />
          </div>
          <div class="mb-3">
            <label class="form-label">Password</label>
            <input className='form-control' type="password" value={newPassword} placeholder="Password"
              onChange={({ target }) => setNewPassword(target.value)} required/>
          </div>
          <div class="mb-3">
            <label class="form-label">Access Level</label>
            <input className='form-control' type="number" value={newAccessLevelId} placeholder="Accesslevel"
              onChange={({ target }) => setNewAccessLevelId(target.value)} />
          </div>

          <button type="submit" className="btn btn-success me-2">
            Save
          </button>

          <button
            type="button"
            className="btn btn-outline-secondary"
            onClick={() => setMuokkaustila(false)}
          >
            Back
          </button>
        </form>

      </div>
    </div>
  )
}


export default UserEdit
