import React, { useState, useEffect, useRef } from 'react'

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
} from '@coreui/react'

import { onAuthStateChanged } from 'firebase/auth'
import CIcon from '@coreui/icons-react'
import { db, auth } from '../../firebase.config'
import { cilTask, cibAddthis, cilSortNumericDown } from '@coreui/icons'
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
  const [searchText, setDesc] = useState('')
  const [sortedby, setSortedBy] = useState('')
  const navigate = useNavigate()
  const isMounted = useRef(true)
  const [userList, setUserList] = useState([])

  const onClick1 = (field, value, op) => {
    setSearch(field)
    setValue(value)
    setOperator(op)
    setSortedBy('')
    console.log(field + op + value)
  }

  const handleChange = (e) => {
    setDesc(e.target.value)
    setValue(searchText)
    setSortedBy('')
    setSearch('Description')
    setOperator('==')
    console.log(searchField + operator + searchValue)
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
        if (sortedby !== '') q = query(listingsRef, orderBy(sortedby, 'desc'))
        else {
          q = query(listingsRef, where(searchField, operator, searchValue))
          console.log('not sorted' + sortedby)
        }

        // searchText ? where(searchField, '>=', searchValue) : '',
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
    <div className="min-vh-400">
      <CRow>
        <CCol>
          <CCard>
            <CCardBody>
              <br />

              <CTable align="middle" className="mb-0 border min-vh-400" hover responsive>
                <CTableHead color="light">
                  <CTableRow>
                    <CTableHeaderCell>
                      <CIcon icon={cilTask} />
                    </CTableHeaderCell>
                    <CTableHeaderCell>TASKID</CTableHeaderCell>
                    <CTableHeaderCell>
                      DESC
                      <CDropdown autoClose="outside" direction="dropend">
                        <CDropdownToggle color="secondary" size="sm" />
                        <CDropdownMenu>
                          <CFormInput
                            type="text"
                            id="descSearch"
                            value={searchText}
                            onChange={handleChange}
                          />
                        </CDropdownMenu>
                      </CDropdown>
                    </CTableHeaderCell>
                    <CTableHeaderCell>
                      STATUS{' '}
                      <CIcon
                        icon={cilSortNumericDown}
                        onClick={() => {
                          setSortedBy('')
                          setSortedBy('status')
                        }}
                        cursor="pointer"
                      />{' '}
                      <CDropdown direction="dropend">
                        <CDropdownToggle color="secondary" size="sm" />
                        <CDropdownMenu>
                          <CDropdownItem
                            onClick={() => onClick1('status', 3, '!=')}
                            cursor="pointer"
                          >
                            All
                          </CDropdownItem>
                          <CDropdownItem
                            onClick={() => onClick1('status', 0, '==')}
                            cursor="pointer"
                          >
                            Pending
                          </CDropdownItem>
                          <CDropdownItem
                            onClick={() => onClick1('status', 1, '==')}
                            cursor="pointer"
                          >
                            Completed
                          </CDropdownItem>
                        </CDropdownMenu>
                      </CDropdown>
                    </CTableHeaderCell>
                    <CTableHeaderCell>
                      User{' '}
                      <CIcon
                        icon={cilSortNumericDown}
                        onClick={() => {
                          setSortedBy('')
                          setSortedBy('AssignedTo')
                        }}
                        cursor="pointer"
                      />{' '}
                      <CDropdown direction="dropend" cursor="pointer">
                        <CDropdownToggle color="secondary" size="sm" />
                        <CDropdownMenu>
                          <CDropdownItem
                            onClick={() => onClick1('AssignedTo', 1000, '!=')}
                            cursor="pointer"
                          >
                            <span cursor="pointer">All Accounts</span>
                          </CDropdownItem>
                          {userList.map((listing) => (
                            <CDropdownItem
                              key={listing.id}
                              onClick={() => onClick1('AssignedTo', listing.id, '==')}
                              cursor="pointer"
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
    </div>
  )
}

export default Tasks
