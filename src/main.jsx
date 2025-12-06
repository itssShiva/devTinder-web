import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { ToastContainer } from 'react-toastify'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
    <ToastContainer position='top-center' toastStyle={{
          backgroundColor: "rgb(29, 35, 42)", 
          color: "#fff",              
          fontWeight: "bold",
        }}/>
  </StrictMode>,
)
