import React, { useEffect, useState } from 'react'
import CIcon from '@coreui/icons-react'
import PropTypes from 'prop-types'
import { CTableDataCell, CTableRow } from '@coreui/react'
import { cilTrash, cilPencil, cilTask } from '@coreui/icons'
import { doc, getDoc, query, where, limit } from 'firebase/firestore'
import { db } from 'src/firebase.config'

function ListingItem({ listing, id, onEdit, onDelete }) {
  const [listings, setListings] = useState([])
  useEffect(() => {
    const getUser = async (uid) => {
      try {
        // Get reference
        const listingsRef = doc(db, 'users', uid)

        // Create a query
        //const q = query(listingsRef, where('id', '==', uid))

        // Execute query
        const querySnap = await getDoc(listingsRef)
        console.log('email' + uid)
        setListings(querySnap.data().email)
      } catch (error) {
        console.log('email' + uid + error)
      }
    }
    getUser(listing.AssignedTo)
  }, [listing.AssignedTo])
  return (
    <CTableRow v-for="item in tableItems">
      <CTableDataCell>
        <CIcon icon={cilTask} className={listing.status ? 'text-success' : 'text-danger'} />
      </CTableDataCell>
      <CTableDataCell>{id}</CTableDataCell>
      <CTableDataCell>{listing.Description}</CTableDataCell>
      <CTableDataCell>{listing.status ? 'Completed' : 'Pending'}</CTableDataCell>
      <CTableDataCell>{listings}</CTableDataCell>
      <CTableDataCell>
        <CIcon
          icon={cilPencil}
          onClick={() => onEdit(id)}
          className="text-primary"
          cursor="pointer"
        />
      </CTableDataCell>
      <CTableDataCell>
        <CIcon
          icon={cilTrash}
          onClick={() => onDelete(listing.id, listing.Description)}
          className="text-danger"
          cursor="pointer"
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
