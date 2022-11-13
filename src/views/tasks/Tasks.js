import React from 'react'

import {
  CAvatar,
  CButton,
  CButtonGroup,
  CCard,
  CCardBody,
  CCardFooter,
  CCardHeader,
  CCol,
  CProgress,
  CRow,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
  CFormInput,
} from '@coreui/react'
import { useState, useEffect, useRef } from 'react'
import { getAuth, onAuthStateChanged } from 'firebase/auth'
import CIcon from '@coreui/icons-react'
import { db, auth } from '../../firebase.config'
import { cilTask, cibAddthis } from '@coreui/icons'
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'
import { collection, getDocs, query, where, orderBy, limit, startAfter } from 'firebase/firestore'
import ListingItem from 'src/components/ListingItem'
const Tasks = () => {
  // const [formData, setFormData] = useState({
  //   type: 'rent',
  //   name: '',
  //   bedrooms: 1,
  //   bathrooms: 1,
  //   parking: false,
  //   furnished: false,
  //   address: '',
  //   offer: false,
  //   regularPrice: 0,
  //   discountedPrice: 0,
  //   images: {},
  //   latitude: 0,
  //   longitude: 0,
  // })

  const [listings, setListings] = useState([])
  const navigate = useNavigate()
  const isMounted = useRef(true)
  useEffect(() => {
    if (isMounted) {
      try {
        onAuthStateChanged(auth, (user) => {
          if (user) {
            console.log(user.uid)
            //auth.signOut()
            // setFormData({ ...formData, userRef: user.uid })
          } else {
            navigate('/login')
          }
        })
      } catch (error) {
        console.log(error)
      }
    }

    return () => {
      isMounted.current = false
    }
  }, [isMounted])

  useEffect(() => {
    const fetchListings = async () => {
      try {
        // Get reference
        const listingsRef = collection(db, 'tasks')

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

        console.log(listings)
      } catch (error) {
        toast.error('Could not fetch listings')
      }
    }

    fetchListings()
  }, [])

  return (
    <>
      <CRow>
        <CCol>
          <CCard>
            <CCardBody>
              <br />

              <CTable align="middle" className="mb-0 border" hover responsive>
                <CTableHead color="light">
                  <CTableRow>
                    <CTableHeaderCell>
                      <CIcon icon={cilTask} />
                    </CTableHeaderCell>
                    <CTableHeaderCell>TASKID</CTableHeaderCell>
                    <CTableHeaderCell>DESC</CTableHeaderCell>
                    <CTableHeaderCell>STATUS</CTableHeaderCell>
                    <CTableHeaderCell>User</CTableHeaderCell>
                    <CTableHeaderCell>EDIT </CTableHeaderCell>
                    <CTableHeaderCell>
                      <Link to="/task">
                        <CIcon icon={cibAddthis} className="text-danger" />
                      </Link>
                    </CTableHeaderCell>
                  </CTableRow>
                </CTableHead>
                <CTableBody>
                  {listings.map((listing) => (
                    <ListingItem listing={listing.data} id={listing.id} key={listing.id} />
                  ))}
                </CTableBody>
              </CTable>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    </>
  )
}

export default Tasks
