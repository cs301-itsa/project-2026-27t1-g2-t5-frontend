import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';

const API_URL = 'https://q78sk6ga6d.execute-api.us-east-1.amazonaws.com/test';
function App() {
  const [message, setMessage] = useState('Loading...');
  const secret = process.env.REACT_APP_SECRET;

  
useEffect(() => {
  console.log("Secret:", secret);

  fetch(API_URL)
    .then(async (res) => {
      if (!res.ok) throw new Error(`HTTP ${res.status}`);

      const text = await res.text();

      try {
        const data = JSON.parse(text);

        // Load balancer response: JSON object with a body field
        if (data && typeof data === "object" && data.body != null) {
          return typeof data.body === "string"
            ? data.body
            : JSON.stringify(data.body);
        }

        // Other JSON response
        return typeof data === "string"
          ? data
          : JSON.stringify(data);
      } catch {
        // Plain-text response
        return text;
      }
    })
    .then((message) => setMessage(message))
    .catch((err) => {
      console.error("API error:", err);
      setMessage("Failed to load message.");
    });
}, [secret]);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload from Github Actions with React.
        </p>
        <p>{message}</p>
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
  );
}

export default App;
