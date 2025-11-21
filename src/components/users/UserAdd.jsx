import '../../App.css'
import React, {useState} from 'react'
import UserService from '../../services/User'
import md5 from 'md5'

const UserAdd = ({setLisäystila, setIsPositive, setMessage, setShowMessage}) => {

// Komponentin tilan määritys

const [newFirstName, setNewFirstName] = useState('')
const [newLastName, setNewLastName] = useState('')
const [newUserName, setNewUserName] = useState('')

const [newEmail, setNewEmail] = useState('')
const [newPassword, setNewPassword] = useState('')
const [newAccessLevelId, setNewAccessLevelId] = useState(2)

// onSubmit tapahtumankäsittelijä funktio
const handleSubmit = (event) => {
      event.preventDefault()
      var newUser = {
        firstName: newFirstName,
        lastName: newLastName,
        userName: newUserName,
        email: newEmail,
        password: md5(newPassword),
        accessLevelId: newAccessLevelId
    }
    
    UserService.create(newUser)
    .then(response => {
      console.log(response.status + ": " + response.statusText);
      if ([200, 201].includes(response.status)) {
       setMessage("Added new User: " + newUser.firstName + " " + newUser.lastName)
       setIsPositive(true)
       setShowMessage(true)
      
       setTimeout(() => {
        setShowMessage(false)
       }, 5000)

       setLisäystila(false)
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
       <h2>User add</h2>

       <form onSubmit={handleSubmit}>
            <div>
                <input type="text" value={newFirstName} placeholder="Firstname"
                    onChange={({ target }) => setNewFirstName(target.value)} required />
            </div>
            <div>
                <input type="text" value={newLastName} placeholder="Lastname"
                    onChange={({ target }) => setNewLastName(target.value)} />
            </div>
            <div>
                <input type="email" value={newEmail} placeholder="Email"
                    onChange={({ target }) => setNewEmail(target.value)} />
            </div>
            <div>
                <input type="text" value={newUserName} placeholder="Username"
                    onChange={({ target }) => setNewUserName(target.value)} />
            </div>
            <div>
                <input type="password" value={newPassword} placeholder="Password"
                    onChange={({ target }) => setNewPassword(target.value)} />
            </div>
            <div>
                <input type="number" value={newAccessLevelId} placeholder="Accesslevel"
                    onChange={({ target }) => setNewAccessLevelId(target.value)} />
            </div>
         
         <input type='submit' value='save' />
         <input type='button' value='back' onClick={() => setLisäystila(false)} />
       </form>

    </div>
  )
}

export default UserAdd
