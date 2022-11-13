import React from 'react'
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
  CFormCheck,
  CRow,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import {
  cilLockLocked,
  cilUser,
  cilDescription,
  cilAvTimer,
  cilBellExclamation,
  cilLineWeight,
  cilNotes,
} from '@coreui/icons'

import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { getAuth, createUserWithEmailAndPassword, updateProfile } from 'firebase/auth'
import { db } from '../../../firebase.config'
import { setDoc, doc, serverTimestamp, collection, getDocs } from 'firebase/firestore'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import nextId from 'react-id-generator'

const Task = () => {
  const [formData, setFormData] = useState({
    Description: '',
    AssignedTo: '',
    DevType: '',
    ElapsedTime: '',
    RequiredTime: '',
    status: '',
    weight: '',
    Remark: '',
  })

  const { Description, AssignedTo, DevType, ElapsedTime, RequiredTime, status, weight, Remark } =
    formData

  // Set with cityConverter

  const navigate = useNavigate()

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }))
  }

  const onSubmit = async (e) => {
    e.preventDefault()
    const uniqueId = nextId()
    console.log(uniqueId)
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
                    <CFormInput
                      id="AssignedTo"
                      placeholder="AssignedTo userId"
                      value={AssignedTo}
                      onChange={onChange}
                    />
                  </CInputGroup>
                  <CInputGroup className="mb-3 ">
                    <CInputGroupText className="ml-3">T</CInputGroupText>
                    <CFormInput
                      id="DevType"
                      placeholder="TaskType"
                      value={DevType}
                      onChange={onChange}
                    />
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
                    <CFormInput
                      id="status"
                      placeholder="status 0 / 1"
                      value={status}
                      onChange={onChange}
                    />
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
