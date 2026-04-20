// Archivo principal de rutas.
import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate, Outlet } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Sidebar from './components/sidebar/Sidebar.jsx'
import Users from './components/users/Users.jsx'
import Login from './components/login/Login.jsx'
import { isUserLoggedIn } from './service/localStorage'
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

function RequireAuth({ children }) {
  if (!isUserLoggedIn()) {
    return <Navigate to="/login" replace />
  }

  return children
}

function RequireGuest({ children }) {
  if (isUserLoggedIn()) {
    return <Navigate to="/" replace />
  }

  return children
}

function App() {
  return (
    <Router>
      <ToastContainer />

      <Routes>
        <Route
          path="/login"
          element={(
            <RequireGuest>
              <Login />
            </RequireGuest>
          )}
        />

        <Route
          element={(
            <RequireAuth>
              <Layout />
            </RequireAuth>
          )}
        >
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path='/users' element={<Users />} />
        </Route>

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  )
}

export default App