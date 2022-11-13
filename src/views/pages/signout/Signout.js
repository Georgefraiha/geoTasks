import React from 'react'
import { Link } from 'react-router-dom'
import { auth } from 'src/firebase.config'

const Signout = () => {
  auth.signOut()
  return <></>
}

export default Signout
