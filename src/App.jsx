// Archivo principal de rutas.
import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route, Link, Outlet } from 'react-router-dom'

import Sidebar from './components/sidebar/Sidebar.jsx'
import Users from './components/users/Users.jsx'
import './App.css'

function Layout() {
  // Estado global del sidebar para que todo el layout se adapte al ancho actual.
  const [sidebarNarrow, setSidebarNarrow] = useState(true)

  // Estas clases permiten que CSS adapte las vistas segun sidebar colapsado o expandido.

  return (
    <div className={`app-shell ${sidebarNarrow ? 'sidebar-narrow' : 'sidebar-expanded'}`}>
      {/* El sidebar notifica cambios de ancho al layout para mantener todo sincronizado. */}
      <Sidebar narrow={sidebarNarrow} onNarrowChange={setSidebarNarrow} />

      <main
        className="app-main"
        style={{
          flex: 1,
          padding: '2rem',
          background: 'linear-gradient(180deg, rgba(30, 83, 110, 0.34), rgba(26, 51, 74, 0.8))',
          color: 'var(--roomops-text)',
          borderLeft: '1px solid var(--roomops-border)',
        }}
      >
        {/* Outlet renderiza la vista activa dentro del contenedor compartido con el sidebar. */}
        <Outlet />
      </main>
    </div>
  )
}

function Home() {
  return (
    <>
      <h1>Inicio</h1>
    </>
  )
}

function App() {
  return (
    <Router>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path='/users' element={<Users />} />
        </Route>
      </Routes>
    </Router>
  )
}

export default App