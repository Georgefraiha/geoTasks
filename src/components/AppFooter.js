import React from 'react'
import { CFooter } from '@coreui/react'

const AppFooter = () => {
  return (
    <CFooter>
      {/* <div>
        <a href="" target="_blank" rel="noopener noreferrer">
          Testint React + Chatbot + Elasticsearch
        </a>
        <span className="ms-1">&copy; Geo.</span>
      </div> */}
      <div className="ms-auto">
        <span className="me-1">Powered by</span>
        <a href="" target="_blank" rel="noopener noreferrer">
          George Fraiha using coreui template
        </a>
      </div>
    </CFooter>
  )
}

export default React.memo(AppFooter)
