import React, {useState} from 'react'
import './App.css'
import Laskuri from './Laskuri'
import Viesti from './Viesti'
import Posts from './Posts'
import CustomerList from './CustomerList'
import Message from './Message'
import { Navbar } from 'react-bootstrap/Navbar'
import { Nav } from 'react-bootstrap/Nav'
import 'bootstrap/dist/css/bootstrap.min.css'
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom'

const App = () => {

// App komponentin tila
const [showLaskuri, setShowLaskuri] = useState(false)
// Statet messagen näyttämistä varten
const [showMessage, setShowMessage] = useState(false)
const [message, setMessage] = useState('')
const [isPositive, setIsPositive] = useState(false)


const huomio = () => {
  alert("Huomio!")
} 

  return (
    <div className="App">
        <h1>Hello from React!</h1>

       {showMessage && <Message message={message} isPositive={isPositive} /> }

        <CustomerList setIsPositive={setIsPositive} setMessage={setMessage} setShowMessage={setShowMessage} />

        <Posts />

        {showLaskuri && <Laskuri huomio={huomio} />}

        {showLaskuri && <button onClick={() => setShowLaskuri(!showLaskuri)}>Piilota laskuri</button>}

        {!showLaskuri && <button onClick={() => setShowLaskuri(!showLaskuri)}>Näytä laskuri</button>}


        {/* <Viesti teksti="tervehdys app komponentista" /> */}
        
    </div>
  )
}

export default App
