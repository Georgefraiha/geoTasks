import React from 'react'

import {
  CCard,
  CCardBody,
  CCol,
  CRow,
  CTable,
  CTableBody,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
} from '@coreui/react'
import { useState, useEffect, useRef } from 'react'
import { getAuth, onAuthStateChanged } from 'firebase/auth'
import CIcon from '@coreui/icons-react'
import { db, auth } from '../../firebase.config'
import { cilUser, cibAddthis } from '@coreui/icons'
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'
import { collection, getDocs, query, where, orderBy, limit, startAfter } from 'firebase/firestore'
import ListingUsers from 'src/components/ListingUsers'
const Users = () => {
  const [formData, setFormData] = useState({
    type: 'rent',
    name: '',
    bedrooms: 1,
    bathrooms: 1,
    parking: false,
    furnished: false,
    address: '',
    offer: false,
    regularPrice: 0,
    discountedPrice: 0,
    images: {},
    latitude: 0,
    longitude: 0,
  })

  const [listings, setListings] = useState([])
  const navigate = useNavigate()
  const isMounted = useRef(true)
  useEffect(() => {
    if (isMounted) {
      try {
        onAuthStateChanged(auth, (user) => {
          if (user) {
            //console.log(user.uid)
            //auth.signOut()
            setFormData({ ...formData, userRef: user.uid })
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
                      <CIcon icon={cilUser} />
                    </CTableHeaderCell>
                    <CTableHeaderCell>USERID</CTableHeaderCell>
                    <CTableHeaderCell>NAME</CTableHeaderCell>
                    <CTableHeaderCell>EMAIL</CTableHeaderCell>
                    <CTableHeaderCell>ADMIN</CTableHeaderCell>
                    <CTableHeaderCell>EDIT </CTableHeaderCell>
                    <CTableHeaderCell>
                      <Link to={`/register`} activeClassName="active">
                        <CIcon icon={cibAddthis} className="text-danger" />
                      </Link>
                    </CTableHeaderCell>
                  </CTableRow>
                </CTableHead>
                <CTableBody>
                  {listings.map((listing) => (
                    <ListingUsers listing={listing.data} id={listing.id} key={listing.id} />
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

export default Users
