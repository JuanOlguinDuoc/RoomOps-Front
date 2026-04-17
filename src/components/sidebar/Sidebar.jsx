import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'
import { CButton, CSidebar, CSidebarBrand, CSidebarFooter, CSidebarHeader, CSidebarNav, CNavItem, CNavTitle } from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilAccountLogout, cilSpeedometer, cilUser } from '@coreui/icons'
import modelo1Logo from '../../assets/icons/modelo 1.svg'
import modelo2Logo from '../../assets/icons/modelo 2.svg'
import './sidebar.css'


export default function SidebarUnfoldableExample({ narrow: controlledNarrow, onNarrowChange }) {
  // Estado local por si este componente se usa sin un layout controlador.
  const [internalNarrow, setInternalNarrow] = useState(true)
  // Si llega una prop externa, sera la fuente de verdad; si no, se usa estado interno.
  const narrow = controlledNarrow ?? internalNarrow

  const setNarrow = (value) => {
    // Notifica al padre para sincronizar el ancho con el resto del layout.
    onNarrowChange?.(value)

    if (controlledNarrow === undefined) {
      // Solo actualiza estado local cuando opera en modo no controlado.
      setInternalNarrow(value)
    }
  }

  return (
    <CSidebar
      className="roomops-sidebar border-end vh-100 d-flex flex-column"
      narrow={narrow}
      unfoldable
      // Se expande al hover y se colapsa al salir para aprovechar mejor el espacio.
      onMouseEnter={() => setNarrow(false)}
      onMouseLeave={() => setNarrow(true)}
    >
      <CSidebarHeader className="border-bottom">
        <CSidebarBrand className="d-flex align-items-center gap-2">
          <img src={narrow ? modelo1Logo : modelo2Logo} alt="RoomOps" style={{ height: 28, width: 'auto' }} />
          {!narrow && <span className="fw-semibold">RoomOps</span>}
        </CSidebarBrand>
      </CSidebarHeader>

      <CSidebarNav className="flex-grow-1">
        <CNavTitle>Menu</CNavTitle>

        <CNavItem>
          <NavLink to="/" className="nav-link">
            <CIcon customClassName="nav-icon" icon={cilSpeedometer} /> Dashboard
          </NavLink>
        </CNavItem>

        <CNavItem>
          <NavLink to="/users" className="nav-link">
            <CIcon customClassName="nav-icon" icon={cilUser} /> Usuarios
          </NavLink>
        </CNavItem>
      </CSidebarNav>

      <CSidebarFooter className={`border-top p-3 mt-auto d-flex ${narrow ? 'justify-content-center' : ''}`}>
        <CButton
          color="danger"
          className={`d-flex align-items-center ${narrow ? 'justify-content-center' : 'justify-content-start w-100'}`}
        >
          <CIcon size="lg" icon={cilAccountLogout} />
          {!narrow && <span className="ms-2">Cerrar Sesión</span>}
        </CButton>
      </CSidebarFooter>
    </CSidebar>
  )
}
