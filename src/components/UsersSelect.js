import React, { useEffect, useState } from 'react'
import { CFormSelect } from '@coreui/react'
import { collection, getDocs, query, where, orderBy, limit, startAfter } from 'firebase/firestore'
import { db } from 'src/firebase.config'
import PropTypes from 'prop-types'

const UsersSelect = () => {
  const [listings, setListings] = useState([])
  useEffect(() => {
    const fetchListings = async () => {
      try {
        // Get reference
        const listingsRef = collection(db, 'users')

        // Create a query
        const q = query(listingsRef, limit(10))

        // Execute query
        const querySnap = await getDocs(q)

        // const lastVisible = querySnap.docs[querySnap.docs.length - 1]
        // setLastFetchedListing(lastVisible)

        const listings = []

        querySnap.forEach((doc) => {
          return listings.push({
            id: doc.id,
            data: doc.data(),
          })
        })

        setListings(listings)
      } catch (error) {}
    }

    fetchListings()
    console.log(listings.data)
  }, [])
  return (
    <>
      <CFormSelect aria-label="Default select example">
        {listings.map((listing) => (
          <option value={listing.id} key={listing.id}>
            {listing.data.name}
          </option>
        ))}
      </CFormSelect>
    </>
  )
}

UsersSelect.propTypes = {
  listing: PropTypes.object,
  id: PropTypes.string,
}
export default UsersSelect
