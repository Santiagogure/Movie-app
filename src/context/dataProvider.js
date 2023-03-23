import axios from 'axios'
import React, { createContext, useEffect, useState } from 'react'

export const AppContext = createContext()

export default function DataProvider({ children }) {
  //User
  const [isLogin, setIsLogin] = useState(false)
  const [imageUrl, setImageUrl] = useState('')
  const [userName, setUserName] = useState('')
  const [userPassword, setUserPassword] = useState('')
  const [userFavorites, setUserFavorites] = useState('')
  const [userWatchlist, setUserWatchlist] = useState('')

  //Display
  const [menuIsVisible, setMenuIsVisible] = useState(false)
  const [recentSearch, setRecentSearch] = useState([])

  useEffect(() => {
    const savedUsername = localStorage.getItem('username')
    if (savedUsername && savedUsername !== 'undefined') {
      setUserName(savedUsername)
      setIsLogin(true)
    }
  }, [userName, userPassword])

  useEffect(() => {}, [])

  const getFavorites = () => {
    axios
      .get(`http://localhost:4000/users/${userName}/favorites`)
      .then((response) => {
        setUserFavorites(response.data)
        console.log('Successful')
      })
      .catch((error) => {
        console.error(error)
      })
  }

  const getWatchlist = () => {
    axios
      .get(`http://localhost:4000/users/${userName}/watchlist`)
      .then((res) => {
        setUserWatchlist(res.data)
      })
      .catch((err) => {
        console.log(err)
      })
  }

  useEffect(() => {
    getFavorites()
    getWatchlist()
  }, [])

  const value = {
    userName,
    setUserName,
    userPassword,
    setUserPassword,
    imageUrl,
    setImageUrl,
    isLogin,
    setIsLogin,
    userFavorites,
    setUserFavorites,
    userWatchlist,
    setUserWatchlist,
    menuIsVisible,
    setMenuIsVisible,
    recentSearch,
    setRecentSearch,
    getFavorites,
    getWatchlist,
  }

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>
}
