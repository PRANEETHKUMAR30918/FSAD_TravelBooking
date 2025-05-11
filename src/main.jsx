import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Dashboard from './Dashboard.jsx'

createRoot(document.getElementById('root')).render(

  <BrowserRouter>
    <Routes>
      <Route path='/' element={<App/>}></Route>
      <Route path='/dashboard' element={<Dashboard/>}></Route>
    </Routes>
  </BrowserRouter>

)
