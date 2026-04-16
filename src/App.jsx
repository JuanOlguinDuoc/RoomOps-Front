// App.jsx
import { Routes, Route, Link, Outlet } from 'react-router-dom'
import { SidebarUnfoldableExample } from './components/sidebar/Sidebar.jsx'

function Layout() {
  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: 'transparent' }}>
      <SidebarUnfoldableExample />

      <main
        style={{
          flex: 1,
          padding: '2rem',
          background: 'linear-gradient(180deg, rgba(47, 61, 85, 0.28), rgba(21, 34, 50, 0.74))',
          color: 'var(--roomops-text)',
          borderLeft: '1px solid var(--roomops-border)',
        }}
      >
        <Outlet />
      </main>
    </div>
  )
}

function Home() {
  return (
    <>
      <h1>Inicio</h1>
      <Link to="/usuarios">
        <button>Ir a usuarios</button>
      </Link>
    </>
  )
}

function Usuarios() {
  return <h1>Vista de usuarios</h1>
}

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/usuarios" element={<Usuarios />} />
      </Route>
    </Routes>
  )
}

export default App