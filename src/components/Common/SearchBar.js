import React, { useState, useContext, useRef } from 'react'
import { IoIosSearch } from 'react-icons/io'
import { useNavigate } from 'react-router-dom'
import { AppContext } from '../../context/dataProvider'

export const SearchBar = () => {
  const navigate = useNavigate()

  const defaultKeyword = useRef('')

  const { recentSearch } = useContext(AppContext)

  const [keyword, setKeyword] = useState('')
  const [isSearchFocus, setSearchFocus] = useState(false)
  const searchRef = useRef < HTMLInputElement > null

  function historialSearch(keyword) {
    if (recentSearch.length < 5) {
      recentSearch.push(keyword)
    } else {
      recentSearch.shift()
      recentSearch.push(keyword)
    }
  }

  const goToSearchPage = () => {
    if (keyword) {
      defaultKeyword.current = keyword
      historialSearch(keyword)
      navigate(`/search?q=${keyword}`)
      setSearchFocus(false)
      searchRef.current?.blur()
    }
  }

  return (
    <div
      className="
        mt-6
       
    border-b-[1.5px] 
    right-10
    border-white
    flex
    items-center
    p-1
    flex-[0.5]
    focus-within:border-primary
    relative
  "
    >
      <input
        onClick={(e) => {
          e.stopPropagation()
          setSearchFocus(true)
        }}
        onKeyDown={(e) => (e.key === 'Enter' ? goToSearchPage() : '')}
        onInput={(e) => setKeyword(e.currentTarget.value)}
        value={keyword}
        type="text"
        className="bg-transparent  max-w-[6.5rem] mr-10 outline-0 flex-1"
        placeholder="Search..."
      />
      <IoIosSearch size={18}></IoIosSearch>
    </div>
  )
}
