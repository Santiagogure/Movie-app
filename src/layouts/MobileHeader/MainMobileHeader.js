import React, { useState, useContext, useRef } from 'react'
import { AppContext } from '../../context/dataProvider'
import { useNavigate } from 'react-router-dom'
import LoginMobileHeader from './LoginMobileHeader'
import MobileHeader from './MobileHeader'

const MainMobileHeader = () => {
  const { menuIsVisible, recentSearch, isLogin } = useContext(AppContext)

  const navigate = useNavigate()

  const defaultKeyword = useRef('')

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
    <>
      {menuIsVisible ? (
        <div className="scroller transition-portal absolute top-0 z-[100] h-screen w-[55%] overflow-y-auto bg-primary shadow-xl">
          {isLogin ? <LoginMobileHeader /> : <MobileHeader />}
        </div>
      ) : (
        ''
      )}
    </>
  )
}

export default MainMobileHeader
