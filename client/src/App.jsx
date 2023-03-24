import { useState } from "react"
import "./App.css"
import axios from "axios"

function App() {

  const [text, setText] = useState('')
  const [count, setCount] = useState(0)

  const sendRequest = () => {
    axios.get(`http://localhost:3000/stream/?text=${text}`)
      .then(response => setCount(response.data))
      .catch(err => alert(err.message))
  }

  return (
    <div className="App">
      <div className="container">
          <textarea type="text" onChange={(e) => setText(e.target.value)}></textarea>
          <div className="c2">
              <button onClick={() => sendRequest()}>Send</button>
              <h1>{ count}</h1>
          </div>
        </div>
    </div>
  )
}

export default App
