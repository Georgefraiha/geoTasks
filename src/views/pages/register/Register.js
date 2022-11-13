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
import { cilLockLocked, cilUser } from '@coreui/icons'

import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { getAuth, createUserWithEmailAndPassword, updateProfile } from 'firebase/auth'
import { db } from '../../../firebase.config'
import { setDoc, doc, serverTimestamp, collection, getDocs } from 'firebase/firestore'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    admin: false,
    password: '',
  })

  const { name, email, admin, password } = formData
  const [prepeat, setRepeat] = useState('')
  const navigate = useNavigate()

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }))
  }

  const onChangeCheck = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.checked,
    }))
  }

  const onChangeRepeat = (e) => {
    setRepeat(e.target.value)
  }
  async function getUsers(db) {
    const userCol = collection(db, 'users')
    const userSnapshot = await getDocs(userCol)
    const userList = userSnapshot.docs.map((doc) => doc.data())
    //console.log(userList)
    return userList
  }

  const onSubmit = async (e) => {
    e.preventDefault()
    if (password === prepeat) {
      try {
        const auth = getAuth()
        console.log(auth)
        // in firebase auth Sign in method tab, enable the Email/password sign-in method and click Save
        const userCredential = await createUserWithEmailAndPassword(auth, email, password)
        const user = userCredential.user
        updateProfile(auth.currentUser, {
          displayName: name,
        })
        const formDataCopy = { ...formData }
        delete formDataCopy.password
        formDataCopy.timestamp = serverTimestamp()
        await setDoc(doc(db, 'users', user.uid), formDataCopy)
        navigate('/users')
      } catch (error) {
        toast.error('Something went wrong with registration!')
      }
    } else {
      console.log('Passwords does not matches!')
      toast.error('Passwords does not matches!')
    }
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
                  <h1>Register</h1>
                  <p className="text-medium-emphasis">Create New account</p>
                  <CInputGroup className="mb-3">
                    <CInputGroupText>
                      <CIcon icon={cilUser} />
                    </CInputGroupText>
                    <CFormInput
                      id="name"
                      placeholder="Username"
                      autoComplete="username"
                      value={name}
                      onChange={onChange}
                    />
                  </CInputGroup>
                  <CInputGroup className="mb-3">
                    <CInputGroupText>@</CInputGroupText>
                    <CFormInput
                      id="email"
                      placeholder="Email"
                      autoComplete="email"
                      value={email}
                      onChange={onChange}
                    />
                  </CInputGroup>
                  <CInputGroup className="mb-3 ">
                    <CInputGroupText className="ml-3">Admin</CInputGroupText>
                    <CFormCheck
                      style={{ margin: '0.8rem' }}
                      id="admin"
                      value={admin}
                      onChange={onChangeCheck}
                    />
                  </CInputGroup>

                  <CInputGroup className="mb-3">
                    <CInputGroupText>
                      <CIcon icon={cilLockLocked} />
                    </CInputGroupText>

                    <CFormInput
                      type="password"
                      placeholder="Password"
                      autoComplete="new-password"
                      id="password"
                      value={password}
                      onChange={onChange}
                    />
                  </CInputGroup>
                  <CInputGroup className="mb-4">
                    <CInputGroupText>
                      <CIcon icon={cilLockLocked} />
                    </CInputGroupText>
                    <CFormInput
                      type="password"
                      autoComplete="new-password"
                      id="prepeat"
                      onChange={onChangeRepeat}
                      value={prepeat}
                      placeholder="Repeat password"
                    />
                  </CInputGroup>
                  <div className="d-grid">
                    <CButton color="success" type="submit" onClick={onSubmit}>
                      Create Account
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

export default Register
