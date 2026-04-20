import React, { useState } from 'react'
import {
  CCard,
  CCardHeader,
  CCardBody,
  CButton,
  CFormInput,
  CInputGroup,
  CInputGroupText,
  CTable,
  CTableHead,
  CTableRow,
  CTableHeaderCell,
  CTableBody,
  CTableDataCell,
  CBadge,
  CAvatar,
  CPagination,
  CPaginationItem,
  CFormCheck
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilSearch, cilFilter, cilPlus, cilPencil, cilSwapHorizontal, cilBan } from '@coreui/icons'
import './users.css'

// Datos de prueba (Luego seran reemplazados con los de la API Spring Boot).
const mockUsers = [
  { id: 1, name: 'Kenzi Lawson', email: 'kenzi.lawson@example.com', role: 'Administrador', status: 'Activo', avatar: 'https://i.pravatar.cc/150?u=1' },
  { id: 2, name: 'Michael Silas', email: 'michael.silas@example.com', role: 'Trabajador', status: 'Inactivo', avatar: 'https://i.pravatar.cc/150?u=2' },
  { id: 3, name: 'Amira Talley', email: 'amira.talley@example.com', role: 'Supervisor', status: 'Activo', avatar: 'https://i.pravatar.cc/150?u=3' },
]

export default function Users() {
  const [searchTerm, setSearchTerm] = useState('')

  // Define el color de la etiqueta segun el estado.
  const getBadgeColor = (status) => {
    return status === 'Activo' ? 'success' : 'danger'
  }

  return (
    <div className="users-view container-fluid px-0">
      <CCard className="users-card mb-4 shadow-sm border-0">
        {/* Encabezado principal. */}
        <CCardHeader className="bg-white d-flex justify-content-between align-items-center py-3 border-bottom">
          <h4 className="mb-0 fw-bold">Gestión de Usuarios</h4>
          <CButton color="dark" className="d-flex align-items-center gap-2">
            <CIcon icon={cilPlus} /> Añadir usuario
          </CButton>
        </CCardHeader>

        <CCardBody>
          {/* Barra de herramientas: buscador y filtros. */}
          <div className="users-toolbar d-flex justify-content-between mb-3">
            <CInputGroup className="users-search">
              <CInputGroupText className="bg-white">
                <CIcon icon={cilSearch} />
              </CInputGroupText>
              <CFormInput 
                placeholder="Buscar por nombre o correo..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </CInputGroup>
            <div className="d-flex gap-2">
              <CButton color="light" variant="outline" className="users-filter-btn text-dark border d-flex align-items-center gap-2">
                <CIcon icon={cilFilter} /> Filtros
              </CButton>
            </div>
          </div>

          {/* Tabla de datos. */}
          <CTable align="middle" responsive hover className="users-table border text-center mb-0">
            <CTableHead color="light">
              <CTableRow>
                <CTableHeaderCell className="text-start" style={{ width: '40px' }}>
                  <CFormCheck />
                </CTableHeaderCell>
                <CTableHeaderCell className="text-start">Usuario</CTableHeaderCell>
                <CTableHeaderCell>Rol</CTableHeaderCell>
                <CTableHeaderCell>Estado</CTableHeaderCell>
                <CTableHeaderCell>Acciones</CTableHeaderCell>
              </CTableRow>
            </CTableHead>
            <CTableBody>
              {mockUsers
                .filter(user => user.name.toLowerCase().includes(searchTerm.toLowerCase()) || user.email.toLowerCase().includes(searchTerm.toLowerCase()))
                .map((user) => (
                <CTableRow key={user.id}>
                  <CTableDataCell className="text-start">
                    <CFormCheck id={`check-${user.id}`} />
                  </CTableDataCell>
                  
                  {/* Columna de nombre, avatar y email. */}
                  <CTableDataCell className="text-start">
                    <div className="d-flex align-items-center gap-3">
                      <CAvatar src={user.avatar} size="md" />
                      <div>
                        <div className="fw-semibold">{user.name}</div>
                        <div className="small text-secondary">{user.email}</div>
                      </div>
                    </div>
                  </CTableDataCell>

                  {/* Columna de rol. */}
                  <CTableDataCell>
                    <span className="fw-medium">{user.role}</span>
                  </CTableDataCell>

                  {/* Columna de estado (badge). */}
                  <CTableDataCell>
                    <CBadge color={getBadgeColor(user.status)} shape="rounded-pill" className="px-3 py-2">
                      {user.status}
                    </CBadge>
                  </CTableDataCell>

                  {/* Columna de acciones. */}
                  <CTableDataCell>
                    <div className="users-actions d-flex justify-content-center gap-2">
                      <CButton
                        color="info"
                        variant="outline"
                        className="users-action-btn"
                        title="Editar perfil"
                        aria-label={`Editar perfil de ${user.name}`}
                      >
                        <CIcon icon={cilPencil} size="sm" />
                      </CButton>
                      <CButton
                        color="warning"
                        variant="outline"
                        className="users-action-btn"
                        title="Cambiar rol"
                        aria-label={`Cambiar rol de ${user.name}`}
                      >
                        <CIcon icon={cilSwapHorizontal} size="sm" />
                      </CButton>
                      <CButton
                        color="danger"
                        className="users-action-btn users-action-btn-danger"
                        title="Desactivar usuario"
                        aria-label={`Desactivar usuario ${user.name}`}
                      >
                        <CIcon icon={cilBan} size="sm" />
                      </CButton>
                    </div>
                  </CTableDataCell>
                </CTableRow>
              ))}
            </CTableBody>
          </CTable>

          {/* Paginacion inferior. */}
          <div className="users-footer d-flex justify-content-between align-items-center mt-3 pt-3 border-top">
            <div className="small text-secondary">
              Mostrando {mockUsers.length} usuarios
            </div>
            <CPagination aria-label="Page navigation" className="mb-0" style={{ cursor: 'pointer' }}>
              <CPaginationItem disabled>Anterior</CPaginationItem>
              <CPaginationItem active>1</CPaginationItem>
              <CPaginationItem>2</CPaginationItem>
              <CPaginationItem>Siguiente</CPaginationItem>
            </CPagination>
          </div>
        </CCardBody>
      </CCard>
    </div>
  )
}