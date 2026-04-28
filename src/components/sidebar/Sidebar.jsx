import React, { useEffect, useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { CButton, CSidebar, CSidebarBrand, CSidebarFooter, CSidebarHeader, CSidebarNav, CNavItem, CNavTitle } from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilAccountLogout, cilSpeedometer, cilUser, cilBuilding } from '@coreui/icons'
import modelo1Logo from '../../assets/icons/modelo 1.svg'
import modelo2Logo from '../../assets/icons/modelo 2.svg'
import { confirmLogout } from '../../utils/alert'
import { isUserAdmin, isUserSupervisor } from '../../service/localStorage'
import './sidebar.css'


export default function SidebarUnfoldableExample({ narrow: controlledNarrow, onNarrowChange, mobileOpen, onMobileClose }) {
  const canViewUsers = isUserAdmin() || isUserSupervisor()

  const [internalNarrow, setInternalNarrow] = useState(true)
  const narrow = controlledNarrow ?? internalNarrow

  // Mobile real (<768): usa drawer con boton hamburguesa.
  const [isMobileView, setIsMobileView] = useState(() =>
    typeof window !== 'undefined' && window.matchMedia('(max-width: 767px)').matches
  )

  // Tablet/touch layout (<992): evita sidebar narrow con hover.
  const [isTabletView, setIsTabletView] = useState(() =>
    typeof window !== 'undefined' && window.matchMedia('(min-width: 768px) and (max-width: 991.98px)').matches
  )

  useEffect(() => {
    const mq = window.matchMedia('(max-width: 767px)')
    const handler = (e) => setIsMobileView(e.matches)
    mq.addEventListener('change', handler)
    return () => mq.removeEventListener('change', handler)
  }, [])

  useEffect(() => {
    const mq = window.matchMedia('(min-width: 768px) and (max-width: 991.98px)')
    const handler = (e) => setIsTabletView(e.matches)
    mq.addEventListener('change', handler)
    return () => mq.removeEventListener('change', handler)
  }, [])

  const navigate = useNavigate()

  const setNarrow = (value) => {
    onNarrowChange?.(value)
    if (controlledNarrow === undefined) {
      setInternalNarrow(value)
    }
  }

  const handleLogout = () => {
    confirmLogout(navigate)
  }

  return (
    <>
      <CSidebar
        className="roomops-sidebar border-end vh-100 d-flex flex-column"
        narrow={isMobileView || isTabletView ? false : narrow}
        unfoldable={!isMobileView && !isTabletView}
        visible={isMobileView ? mobileOpen : undefined}
        onHide={() => isMobileView && onMobileClose?.()}
        onMouseEnter={() => !isMobileView && !isTabletView && setNarrow(false)}
        onMouseLeave={() => !isMobileView && !isTabletView && setNarrow(true)}
      >
        <CSidebarHeader className="border-bottom">
          <CSidebarBrand className="d-flex align-items-center gap-2">
            <img
              src={isMobileView || isTabletView || !narrow ? modelo2Logo : modelo1Logo}
              alt="RoomOps"
              style={{ height: 28, width: 'auto' }}
            />
            {(isMobileView || isTabletView || !narrow) && <span className="fw-semibold">RoomOps</span>}
          </CSidebarBrand>
        </CSidebarHeader>

        <CSidebarNav className="flex-grow-1">
          <CNavTitle>Menu</CNavTitle>

          <CNavItem>
            <NavLink
              to="/"
              className="nav-link"
              onClick={isMobileView ? onMobileClose : undefined}
            >
              <CIcon customClassName="nav-icon" icon={cilSpeedometer} /> Dashboard
            </NavLink>
          </CNavItem>

          {canViewUsers && (
            <CNavItem>
              <NavLink
                to="/users"
                className="nav-link"
                onClick={isMobileView ? onMobileClose : undefined}
              >
                <CIcon customClassName="nav-icon" icon={cilUser} /> Usuarios
              </NavLink>
            </CNavItem>
          )}
          {canViewUsers && (
            <CNavItem>
              <NavLink
                to="/apartments"
                className="nav-link"
                onClick={isMobileView ? onMobileClose : undefined}
              >
                <CIcon customClassName="nav-icon" icon={cilBuilding} /> Apartamentos
              </NavLink>
            </CNavItem>
          )}
        </CSidebarNav>

        <CSidebarFooter
          className={`border-top p-3 mt-auto d-flex ${!isMobileView && !isTabletView && narrow ? 'justify-content-center' : ''}`}
        >
          <CButton
            color="danger"
            className={`d-flex align-items-center ${!isMobileView && !isTabletView && narrow ? 'justify-content-center' : 'justify-content-start w-100'}`}
            onClick={handleLogout}
          >
            <CIcon size="lg" icon={cilAccountLogout} />
            {(isMobileView || isTabletView || !narrow) && <span className="ms-2">Cerrar Sesión</span>}
          </CButton>
        </CSidebarFooter>
      </CSidebar>
    </>
  )
}
