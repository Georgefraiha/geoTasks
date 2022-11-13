import React from 'react'
import CIcon from '@coreui/icons-react'
import PropTypes from 'prop-types'
import { CTableDataCell, CTableRow } from '@coreui/react'
import { cilTrash, cilPencil, cilTask } from '@coreui/icons'
function ListingItem({ listing, id, onEdit, onDelete }) {
  return (
    <CTableRow v-for="item in tableItems">
      <CTableDataCell>
        <CIcon icon={cilTask} className="text-danger" />
      </CTableDataCell>
      <CTableDataCell>{id}</CTableDataCell>
      <CTableDataCell>{listing.Description}</CTableDataCell>
      <CTableDataCell>{listing.status}</CTableDataCell>
      <CTableDataCell>{listing.AssignedTo}</CTableDataCell>
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
ListingItem.propTypes = {
  listing: PropTypes.object,
  id: PropTypes.string,
  onEdit: PropTypes.func,
  onDelete: PropTypes.func,
}
export default ListingItem
