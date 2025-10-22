import React from 'react'
import { BrowserRouter as Router,Route, Routes } from 'react-router-dom'
import Home from './routes/pages/V2/Home.js'
import ScannerLogin from './routes/pages/V2/ScannerLogin'
import HomEstudiante from './routes/pages/V2/Estudiantes/HomEstudiante'
import Dashboard from './routes/pages/V2/Admin/page'
import HomeLogin from './routes/pages/V2/SeccionesLogin.js'
import { LoginForm } from './routes/pages/V2/loginAdmin_Inst/login-form'
import HomeInstructores from './routes/pages/V2/Instructores/HomeInstructores.js'
import { SignUpForm } from './routes/pages/V2/loginAdmin_Inst/signup-form'
import Contactanos from './routes/pages/V2/Contactanos.js'
import Productos from './routes/pages/V2/Productos.js'
import Nosotros from './routes/pages/V2/Nosotros.js'



function App() {
  {/* 
    <Route path="/index.html" element={<Home/>}/>
    <Route path="/lagoagrio" element={<SedeLagoAgrio/>}/>
    <Route path="/elcoca" element={<SedeElCoca/>}/>
    <Route path="/lajoyadelosachas" element={<SedeLaJoyaDeLosSachas/>}/>
    <Route path="/spline" element={<SplinePage/>}/>
    <Route path="/scanner" element={<IndexQr/>}/>
    <Route path="/login" element={<Login/>}/>
    <Route path="/qrasistencia" element={<QRasistencia/>}/>
    <Route path="/qrpuntos" element={<QRpuntos/>}/>
    <Route path="/rgtechnology" element={<Rgtechnology/>}/>
    <Route path="*" element={<Home/>}/> 
  */}

  return (
    <div>
      <Routes>
        <Route path="*" element={<Home/>}/>
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
