import '../../App.css'
import React, { useState, useEffect } from 'react'
import UserService from '../../services/User'
import UserAdd from './UserAdd'
import UserEdit from './UserEdit'
import User from './User'

let tableHeaders = ['First Name', 'Last Name', 'Email', 'Access', '']
let tableFields = ['firstname', 'lastname', 'email', 'accesslevelId']

const UserList = ({ setIsPositive, setShowMessage, setMessage }) => {

  // Komponentin tilan määritys
  const [users, setUsers] = useState([])
  const [lisäystila, setLisäystila] = useState(false)
  const [muokkaustila, setMuokkaustila] = useState(false)
  const [reload, reloadNow] = useState(false)
  const [muokattavaUser, setMuokattavaUser] = useState(false)
  const [search, setSearch] = useState('')

  useEffect(() => {
    UserService.setToken(localStorage.getItem('token'))
    UserService.getAll()
      .then(data => {
        setUsers(data)
      })
  }, [lisäystila, reload, muokkaustila]
  )

  // Hakutoiminto
  const handleSearchChange = (event) => {
    setSearch(event.target.value.toLowerCase())
  }

  const editUser = (user) => {
    setMuokattavaUser(user)
    setMuokkaustila(true)
  }

  const deleteUser = (user) => {
    let vastaus = window.confirm(`Remove User ${user.username}`)
    if (vastaus === true) {
      UserService.remove(user.userId)
        .then(response => {
          console.log(response.status)
          if (response.status === 204) {
            setMessage("Deleted User: " + user.username)
            setIsPositive(true)
            setShowMessage(true)

            setTimeout(() => {
              setShowMessage(false)
            }, 5000)

            reloadNow(!reload)
          }
        })
        .catch(error => {
          setMessage(error)
          setIsPositive(false)
          setShowMessage(true)

          setTimeout(() => {
            setShowMessage(false)
          }, 6000)
        })
    } // Jos poisto halutaankin perua
    else {
      setMessage('Poisto peruttu onnistuneesti.')
      setIsPositive(true)
      setShowMessage(true)

      setTimeout(() => {
        setShowMessage(false)
      }, 5000)
    }
  }

  return (
    <>
      <h1><nobr>Users</nobr>

        {!lisäystila && <button className="nappi" onClick={() => setLisäystila(true)}>Add new</button>}</h1>

      {!lisäystila && !muokkaustila &&
        <input className="searchInput" type="text" value={search} onChange={handleSearchChange} placeholder="Search by lastname" />
      }

      {lisäystila && <UserAdd setLisäystila={setLisäystila}
        setIsPositive={setIsPositive} setMessage={setMessage} setShowMessage={setShowMessage}
      />}

      {muokkaustila && <UserEdit setMuokkaustila={setMuokkaustila}
        setIsPositive={setIsPositive} setMessage={setMessage} setShowMessage={setShowMessage}
        muokattava={muokattavaUser}
      />}

      {!lisäystila && !muokkaustila &&
        <table className='table mt-3' id='userTable'>
          <thead>
            <tr>
              {tableHeaders.map((header, index) =>
                <th key={index}>{header}</th>
              )}
            </tr>
          </thead>
          <tbody>
            {
              users && users.map(u => {
                const lowerName = u.lastname.toLowerCase()
                if (lowerName.indexOf(search) > -1) {
                  return (
                    <tr key={u.userId}>
                      {tableFields.map((field =>
                        <td>{u[field]}</td>
                      ))}
                      <td>
                        <button className='btn btn-warning me-3' title={u.username} onClick={() => editUser(u)}>Edit</button>
                        <button className='btn btn-danger' title={u.username} onClick={() => deleteUser(u)}>Del</button>
                      </td>
                    </tr>
                  )
                }
              }
              )
            }

          </tbody>
        </table>
      }
    </>
  )
}

export default UserList
