import React from 'react'
import axios from 'axios'
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
    email: 'rent',
    name: '',
    admin: false,
  })
  const url =
    'https://firestore.googleapis.com/v1/projects/geotasks-fede4/databases/(default)/documents/users'
  const [listings, setListings] = useState([])
  const [persons, setPersons] = useState([])
  const navigate = useNavigate()
  const isMounted = useRef(true)

  const listUsers = () => {
    axios.get(url).then((res) => {
      persons.push(res.data.documents)
      //console.log(persons[0])
      persons[0].forEach((listing) => console.log(listing.fields.email.stringValue))

      // this.setState({ persons })
    })
  }

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

        // console.log(listings)
      } catch (error) {
        toast.error('Could not fetch listings')
      }
    }
    listUsers()
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
                      <Link to={`/register`} className="active">
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
