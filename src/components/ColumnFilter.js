import React from 'react'
import { useState } from 'react'

const ColumnFilter = () => {
  const { filterValue, setFilter } = useState(null)
  return (
    <span>
      Search:{''} <input value={filterValue || ''} onChange={(e) => setFilter(e.target.value)} />
    </span>
  )
}

export default ColumnFilter
