import '../../App.css'
import React, { useState } from 'react'
import UserService from '../../services/User'

let tableHeaders = ['First Name', 'Last Name', 'Email', 'Accesslevel']
let tableFields = ['firstname', 'lastname', 'email', 'accesslevelId']

// props on nimeltään customer
const User = ({ user, editUser, setIsPositive, setMessage, setShowMessage, reload, reloadNow }) => {

    // Komponentin tilan määritys
    const [showDetails, setShowDetails] = useState(false)

    const deleteUser = (user) => {
        let vastaus = window.confirm(`Remove User ${user.userName}`)

        if (vastaus === true) {
            UserService.remove(user.userId)
                .then(res => {
                    if (res.status === 200) {
                        setMessage(`Successfully removed user ${user.userName}`)
                        setIsPositive(true)
                        setShowMessage(true)
                        window.scrollBy(0, -10000) // Scrollataan ylös jotta nähdään alert :)

                        // Ilmoituksen piilotus
                        setTimeout(() => {
                            setShowMessage(false)
                        },
                            5000
                        )
                        reloadNow(!reload)
                    }

                }
                )
                .catch(error => {
                    setMessage(error)
                    setIsPositive(false)
                    setShowMessage(true)
                    window.scrollBy(0, -10000) // Scrollataan ylös jotta nähdään alert :)

                    setTimeout(() => {
                        setShowMessage(false)
                    }, 6000)
                })

        } // Jos poisto halutaankin perua
        else {
            setMessage('Poisto peruttu onnistuneesti.')
            setIsPositive(true)
            setShowMessage(true)
            window.scrollBy(0, -10000) // Scrollataan ylös jotta nähdään alert :)

            // Ilmoituksen piilotus
            setTimeout(() => {
                setShowMessage(false)
            },
                5000
            )
        }
    }

    return (
        <div className='customerDiv'>

            <h4 onClick={() => setShowDetails(!showDetails)}>
                {user.userName}
            </h4>

            {showDetails &&
                <div className="customerDetails">

                    <h3>{user.userName}</h3>

                    <button onClick={() => deleteUser(user)}>Delete</button>
                    <button onClick={() => editUser(user)}>Edit</button>

                    <table>
                        <thead>
                            <tr>
                                {tableHeaders.map((header, index) =>
                                    <th key={index}>{header}</th>
                                )}
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                {tableFields.map((field, index) =>
                                    <td key={index}>{user[field]}</td>
                                )}
                            </tr>
                        </tbody>
                    </table>
                </div>}
        </div>
    )
}

export default User