import React from 'react'
import CIcon from '@coreui/icons-react'
import PropTypes from 'prop-types'
import { CTableDataCell, CTableRow } from '@coreui/react'

import { cilTrash, cilPencil, cilUser } from '@coreui/icons'
function ListingUsers({ listing, id, onEdit, onDelete }) {
  return (
    <CTableRow v-for="item in tableItems">
      <CTableDataCell>
        <CIcon icon={cilUser} className="text-success" />
      </CTableDataCell>
      <CTableDataCell>{id}</CTableDataCell>
      <CTableDataCell>{listing.name}</CTableDataCell>
      <CTableDataCell>{listing.email}</CTableDataCell>
      <CTableDataCell>{listing.admin}</CTableDataCell>

      <CTableDataCell>
        <CIcon icon={cilPencil} onClick={() => onEdit(id)} className="text-primary" />
      </CTableDataCell>
      <CTableDataCell>
        <CIcon
          icon={cilTrash}
          onClick={() => onDelete(listing.id, listing.Description)}
          className="text-danger"
        />
      </CTableDataCell>
    </CTableRow>
  )
}
ListingUsers.propTypes = {
  listing: PropTypes.object,
  id: PropTypes.string,
  onEdit: PropTypes.func,
  onDelete: PropTypes.func,
}
export default ListingUsers
