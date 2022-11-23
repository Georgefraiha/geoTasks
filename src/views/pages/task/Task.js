import React, { useEffect, useState } from 'react'
import TaskType from 'src/components/TaskType'
import { CFormSelect } from '@coreui/react'
// import UsersSelect from 'src/components/UsersSelect'
import {
  CButton,
  CCard,
  CCardBody,
  CCol,
  CContainer,
  CForm,
  CFormInput,
  CInputGroup,
  CInputGroupText,
  CRow,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import {
  cilUser,
  cilDescription,
  cilAvTimer,
  cilBellExclamation,
  cilLineWeight,
  cilNotes,
} from '@coreui/icons'
import { useNavigate } from 'react-router-dom'
import { db } from '../../../firebase.config'
import { setDoc, doc } from 'firebase/firestore'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import nextId from 'react-id-generator'
import { collection, getDocs, query, limit } from 'firebase/firestore'

const Task = () => {
  const [formData, setFormData] = useState({
    Description: '',
    AssignedTo: '',
    DevType: 1,
    ElapsedTime: '',
    RequiredTime: '',
    status: 0,
    weight: '',
    Remark: '',
  })

  const { Description, AssignedTo, DevType, ElapsedTime, RequiredTime, status, weight, Remark } =
    formData

  // Set with cityConverter

  const navigate = useNavigate()
  const [listings, setListings] = useState([])
  const [userList, setUserList] = useState([])
  useEffect(() => {
    const fetchTasks = async () => {
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

    const fetchUsers = async () => {
      try {
        // Get reference
        const listingsRef = collection(db, 'users')

        // Create a query
        const q = query(listingsRef, limit(10))

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
    fetchTasks()
    fetchUsers()
  }, [])

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }))
  }
  const onChangeSelect = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }))
  }

  const onSubmit = async (e) => {
    e.preventDefault()
    const uniqueId = nextId()
    console.log(AssignedTo)
    const ref = doc(db, 'tasks', uniqueId)

    await setDoc(ref, formData)
    navigate('/')
  }
  return (
    <div className="bg-light min-vh-100 d-flex flex-row align-items-center">
      <ToastContainer />
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md={9} lg={7} xl={6}>
            <CCard className="mx-4">
              <CCardBody className="p-4">
                <CForm>
                  <h1>Tasks</h1>
                  <p className="text-medium-emphasis">Create New Task</p>
                  <CInputGroup className="mb-3">
                    <CInputGroupText>
                      <CIcon icon={cilDescription} />
                    </CInputGroupText>
                    <CFormInput
                      id="Description"
                      placeholder="Description"
                      value={Description}
                      onChange={onChange}
                    />
                  </CInputGroup>
                  <CInputGroup className="mb-3">
                    <CInputGroupText>
                      <CIcon icon={cilUser} />
                    </CInputGroupText>
                    <CFormSelect
                      aria-label="Default select example"
                      id="AssignedTo"
                      onChange={onChange}
                    >
                      {userList.map((listing) => (
                        <option value={listing.id} key={listing.id}>
                          {listing.data.name}
                        </option>
                      ))}
                    </CFormSelect>
                    {/* <UsersSelect id="AssignedTo" value={AssignedTo} onChange={onChangeSelect} /> */}
                  </CInputGroup>
                  <CInputGroup className="mb-3 ">
                    <CInputGroupText>TYPE</CInputGroupText>
                    <CFormSelect
                      htmlSize={2}
                      aria-label="size 2 select example"
                      id="DevType"
                      onChange={onChange}
                    >
                      {listings.map((listing) => (
                        <option value={listing.id} key={listing.id}>
                          {listing.data.tasktype}
                        </option>
                      ))}
                    </CFormSelect>
                    {/* <TaskType id="DevType" data={DevType} onChange={onChangeSelect} /> */}
                  </CInputGroup>

                  <CInputGroup className="mb-3">
                    <CInputGroupText>
                      <CIcon icon={cilAvTimer} />
                    </CInputGroupText>

                    <CFormInput
                      id="ElapsedTime"
                      placeholder="ElapsedTime"
                      value={ElapsedTime}
                      onChange={onChange}
                    />
                  </CInputGroup>
                  <CInputGroup className="mb-4">
                    <CInputGroupText>
                      <CIcon icon={cilAvTimer} />
                    </CInputGroupText>
                    <CFormInput
                      id="RequiredTime"
                      placeholder="RequiredTime"
                      value={RequiredTime}
                      onChange={onChange}
                    />
                  </CInputGroup>
                  <CInputGroup className="mb-4">
                    <CInputGroupText>
                      <CIcon icon={cilBellExclamation} />
                    </CInputGroupText>
                    <CFormSelect
                      aria-label="Default select example"
                      id="status"
                      value={status}
                      onChange={onChangeSelect}
                    >
                      <option value="0">Pending</option>
                      <option value="1">Completed</option>
                    </CFormSelect>
                  </CInputGroup>
                  <CInputGroup className="mb-4">
                    <CInputGroupText>
                      <CIcon icon={cilLineWeight} />
                    </CInputGroupText>
                    <CFormInput
                      id="weight"
                      placeholder="weight"
                      value={weight}
                      onChange={onChange}
                    />
                  </CInputGroup>
                  <CInputGroup className="mb-4">
                    <CInputGroupText>
                      <CIcon icon={cilNotes} />
                    </CInputGroupText>
                    <CFormInput
                      id="Remark"
                      placeholder="Remark"
                      value={Remark}
                      onChange={onChange}
                    />
                  </CInputGroup>
                  <div className="d-grid">
                    <CButton color="success" type="submit" onClick={onSubmit}>
                      Create Task
                    </CButton>
                  </div>
                </CForm>
              </CCardBody>
            </CCard>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  )
}

export default Task
