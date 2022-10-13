import React from 'react'
import "./styles/SearchInput.css"

const SearchInput = ({ setPokeSearch, setTypeInfo }) => {

  const handleSubmit = e => {
    e.preventDefault()
    setPokeSearch(e.target.searchText.value.trim().toLowerCase())
    setTypeInfo("All")
    e.target.searchText.value = ""
  }

  return (
    <form onSubmit={handleSubmit} >
      <input type="text" placeholder='Search your Pokemon' id='searchText' />
      <button>Search</button>
    </form>
  )
}

export default SearchInput