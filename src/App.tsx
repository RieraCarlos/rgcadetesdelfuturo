import React from 'react'
import { BrowserRouter as Router,Route, Routes } from 'react-router-dom'
import Home from './routes/Home'
import HomEstudiante from './routes/pages/Estudiantes/HomEstudiante.js'
import Dashboard from './routes/pages/Admin/page'
import HomeLogin from './routes/SeccionesLogin'
import { LoginForm } from './routes/pages/loginAdmin_Inst/login-form'
import HomeInstructores from './routes/pages/Instructores/HomeInstructores.js'
import { SignUpForm } from './routes/pages/loginAdmin_Inst/signup-form'
import Contactanos from './routes/Contactanos'
import Productos from './routes/Productos'
import Nosotros from './routes/Nosotros'
import ScannerLogin from './routes/ScannerLogin'

function App() {
  return (
    <div>
      <Routes>
        <Route path="/*" element={<Home/>}/>
        <Route path="/seccion/login" element={<HomeLogin/>}/>
        <Route path="/estudiante/login" element={<ScannerLogin/>}/>
        <Route path="/login" element={<LoginForm/>}/>
        <Route path="/signup" element={<SignUpForm/>}/>
        <Route path="/estudiante" element={<HomEstudiante/>}/>
        <Route path="/instructor" element={<HomeInstructores/>}/>
        <Route path="/dashboard/admin" element={<Dashboard/>}/>
        <Route path="/contactanos" element={<Contactanos/>}/>
        <Route path="/productos" element={<Productos/>}/>
        <Route path="/nosotros" element={<Nosotros/>}/>
      </Routes>
    </div>
  )
}

export default App
