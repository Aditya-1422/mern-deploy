import React from 'react'
import {BrowserRouter, Route, Routes} from 'react-router-dom'
import Home from './pages/Home'
import Register from './pages/Register'


const App = () => {
  return (
    <BrowserRouter>
        <Routes>
          <Route exact path='/' element={<Home/>}/>
          <Route exact path='/register' element={<Register/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App