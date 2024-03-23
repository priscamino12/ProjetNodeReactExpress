import React from 'react'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Home from './Home'
import 'bootstrap/dist/css/bootstrap.min.css'
import Create from './Create'
import Editer from './Editer'
import Read from './Read'

function App() {
  return (
   <BrowserRouter>
    <Routes>
      <Route path='/' element={<Home />}/>
      <Route path='/create' element={<Create />}/>
      <Route path='/read/:numEt' element={<Read />}/>
      <Route path='/editer/:numEt' element={<Editer />}/>
    </Routes>
   </BrowserRouter>
  )
}

export default App;
