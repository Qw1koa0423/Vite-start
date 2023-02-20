import logo from './logo.svg'
import './App.css'
import _ from 'lodash'
import { useEffect } from 'react'
const lodash = require('lodash')
function App () {
  useEffect(() => {
    console.log('lodash', lodash)
    console.log('lodash-es', _)
  }, [])
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  )
}

export default App
