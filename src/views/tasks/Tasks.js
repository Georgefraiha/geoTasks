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
  CDropdownToggle,
  CDropdown,
  CDropdownMenu,
  CDropdownItem,
  CFormInput,
  CFormLabel,
  CForm,
  CButton,
  CDropdownDivider,
} from '@coreui/react'

import { useState, useEffect, useRef } from 'react'
import { onAuthStateChanged } from 'firebase/auth'
import CIcon from '@coreui/icons-react'
import { db, auth } from '../../firebase.config'
import { cilTask, cibAddthis, cilSortNumericDown, cilChevronCircleDownAlt } from '@coreui/icons'
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'
// import { useTable, useGlobalFilter, useFilters } from 'react-table'
import { collection, getDocs, query, where, orderBy } from 'firebase/firestore'
import ListingItem from 'src/components/ListingItem'

const Tasks = () => {
  const [listings, setListings] = useState([])
  const [searchField, setSearch] = useState('AssignedTo')
  const [operator, setOperator] = useState('!=')
  const [searchValue, setValue] = useState('')

  const [sortedby, setSortedBy] = useState(null)
  const navigate = useNavigate()
  const isMounted = useRef(true)
  const [userList, setUserList] = useState([])
  const onClick1 = (field, value, op) => {
    setSearch(field)
    setValue(value)
    setOperator(op)
    console.log(field + op + value)
  }
  useEffect(() => {
    if (isMounted) {
      try {
        onAuthStateChanged(auth, (user) => {
          if (user) {
            console.log(user.uid)
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
  }, [navigate, isMounted])

  useEffect(() => {
    const fetchListings = async () => {
      try {
        // Get reference
        const listingsRef = collection(db, 'tasks')
        var q
        // Create a query
        sortedby
          ? (q = query(
              listingsRef,
              orderBy(sortedby, 'asc'),
              where(searchField, operator, searchValue),
            ))
          : (q = query(listingsRef, where(searchField, operator, searchValue)))

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

        //console.log(listings)
      } catch (error) {
        toast.error('Could not fetch listings')
      }
    }

    fetchListings()
  }, [sortedby, searchField, operator, searchValue])

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        // Get reference
        const listingsRef = collection(db, 'users')

        // Create a query
        const q = query(listingsRef)

        // Execute query
        const querySnap = await getDocs(q)

        // const lastVisible = querySnap.docs[querySnap.docs.length - 1]
        // setLastFetchedListing(lastVisible)

        const userList = []

        querySnap.forEach((doc) => {
          return userList.push({
            id: doc.id,
            data: doc.data(),
          })
        })

        setUserList(userList)
      } catch (error) {}
    }
    fetchUsers()
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
                    <CTableHeaderCell>
                      DESC
                      <CDropdown autoClose="outside">
                        <CDropdownToggle color="secondary" size="sm" />
                        <CDropdownMenu>
                          <CFormInput type="text" id="statusSearch" />
                        </CDropdownMenu>
                      </CDropdown>
                    </CTableHeaderCell>
                    <CTableHeaderCell>
                      STATUS{' '}
                      <CIcon
                        icon={cilSortNumericDown}
                        onClick={() => setSortedBy('status')}
                        cursor="pointer"
                      />{' '}
                      <CDropdown>
                        <CDropdownToggle color="secondary" size="sm" />
                        <CDropdownMenu>
                          <CDropdownItem onClick={() => onClick1('status', 3, '!=')}>
                            All
                          </CDropdownItem>
                          <CDropdownItem onClick={() => onClick1('status', 0, '==')}>
                            Pending
                          </CDropdownItem>
                          <CDropdownItem onClick={() => onClick1('status', 1, '==')}>
                            Completed
                          </CDropdownItem>
                        </CDropdownMenu>
                      </CDropdown>
                    </CTableHeaderCell>
                    <CTableHeaderCell>
                      User{' '}
                      <CIcon
                        icon={cilSortNumericDown}
                        onClick={() => setSortedBy('AssignedTo')}
                        cursor="pointer"
                      />{' '}
                      <CDropdown>
                        <CDropdownToggle color="secondary" size="sm" />
                        <CDropdownMenu>
                          <CDropdownItem onClick={() => onClick1('AssignedTo', 1000, '!=')}>
                            All Accounts
                          </CDropdownItem>
                          {userList.map((listing) => (
                            <CDropdownItem
                              key={listing.id}
                              onClick={() => onClick1('AssignedTo', listing.id, '==')}
                            >
                              {listing.data.email}
                            </CDropdownItem>
                          ))}
                        </CDropdownMenu>
                      </CDropdown>
                    </CTableHeaderCell>
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
