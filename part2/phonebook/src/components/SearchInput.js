import React from 'react'

const SearchInput = ({searchPersonField,handleSearch}) => {
    return ( 
      <div>filter shown with <input value={searchPersonField} onChange={handleSearch} /></div>
    )
    }

export default SearchInput