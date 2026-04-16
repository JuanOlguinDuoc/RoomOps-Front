import React, { useState } from 'react'
import { CButton, CSidebar, CSidebarBrand, CSidebarFooter, CSidebarHeader, CSidebarNav, CNavItem, CNavTitle } from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilAccountLogout, cilSpeedometer } from '@coreui/icons'
import modelo1Logo from '../../assets/icons/modelo 1.svg'
import modelo2Logo from '../../assets/icons/modelo 2.svg'
import './sidebar.css'


export const SidebarUnfoldableExample = () => {
  const [narrow, setNarrow] = useState(true)

  return (
    <CSidebar
      className="roomops-sidebar border-end vh-100 d-flex flex-column"
      narrow={narrow}
      unfoldable
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
        <CNavItem href="#">
          <CIcon customClassName="nav-icon" icon={cilSpeedometer} /> Dashboard
        </CNavItem>
        <CNavItem href="#">
          <CIcon customClassName="nav-icon" icon={cilSpeedometer} /> Tablero
        </CNavItem>
        <CNavItem href="#">
          <CIcon customClassName="nav-icon" icon={cilSpeedometer} /> Usuarios
        </CNavItem>
        <CNavItem href="#">
          <CIcon customClassName="nav-icon" icon={cilSpeedometer} /> Departamentos
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
