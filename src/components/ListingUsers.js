import React from 'react'
import CIcon from '@coreui/icons-react'
import PropTypes from 'prop-types'
import { CTableDataCell, CTableRow } from '@coreui/react'

import { cilTrash, cilPencil, cilUser } from '@coreui/icons'
// function ListingUsers({ name, email, admin, id, onEdit, onDelete }) {
function ListingUsers({ name, email, admin, id }) {
  const onEdit = () => {}
  const onDelete = () => {}
  //console.log(name + email + admin + id)
  return (
    <CTableRow v-for="item in tableItems">
      <CTableDataCell>
        <CIcon icon={cilUser} className="text-success" />
      </CTableDataCell>
      <CTableDataCell>{id}</CTableDataCell>
      <CTableDataCell>{name}</CTableDataCell>
      <CTableDataCell>{email}</CTableDataCell>
      <CTableDataCell>{admin ? 'admin' : 'guest'}</CTableDataCell>

      <CTableDataCell>
        <CIcon icon={cilPencil} onClick={() => onEdit(id)} className="text-primary" />
      </CTableDataCell>
      <CTableDataCell>
        <CIcon icon={cilTrash} onClick={() => onDelete(id)} className="text-danger" />
      </CTableDataCell>
    </CTableRow>
  )
}
ListingUsers.propTypes = {
  name: PropTypes.string,
  email: PropTypes.string,
  admin: PropTypes.bool,
  id: PropTypes.string,
  // onEdit: PropTypes.func,
  // onDelete: PropTypes.func,
}
export default ListingUsers
