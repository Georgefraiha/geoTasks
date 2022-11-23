import React, { useEffect, useState } from 'react'
import { CFormSelect } from '@coreui/react'
import { collection, getDocs, query, where, orderBy, limit, startAfter } from 'firebase/firestore'
import { db } from 'src/firebase.config'
import PropTypes from 'prop-types'
import { toast } from 'react-toastify'

const TaskType = (props, onChange) => {
  const [listings, setListings] = useState([])
  useEffect(() => {
    const fetchListings = async () => {
      try {
        // Get reference
        const listingsRef = collection(db, 'tasktype')

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
    console.log(props.id)
  }, [])
  return (
    <>
      <CFormSelect htmlSize={2} aria-label="size 2 select example" value={props.id}>
        {listings.map((listing) => (
          <option value={listing.id} key={listing.id}>
            {listing.data.tasktype}
          </option>
        ))}
      </CFormSelect>
    </>
  )
}

TaskType.propTypes = {
  listing: PropTypes.object,
  id: PropTypes.string,
}
export default TaskType
