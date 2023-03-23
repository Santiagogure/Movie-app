import React, { useContext } from 'react'
import { AppContext } from '../../context/dataProvider'

import { SearchBar } from '../../components/Common/SearchBar'
import { Link, useNavigate } from 'react-router-dom'

const LoginMobileHeader = () => {
  const navigate = useNavigate()
  const { setMenuIsVisible, setIsLogin, userName } = useContext(AppContext)

  const handleLogOut = () => {
    localStorage.clear()
    setIsLogin(false)
  }

  return (
    <>
      <div className="flex flex-col items-start justify-start ml-10 p-2">
        <span
          className="absolute right-2 top-2 cursor-pointer text-white"
          onClick={() => {
            setMenuIsVisible(false)
          }}
        >
          <ion-icon name="close" style={{ fontSize: '30px' }}></ion-icon>
        </span>

        <div className="flex relative right-2 items-center justify-center mt-10">
          <img
            src="https://via.placeholder.com/150"
            alt="user profile"
            className="w-28 h-28 rounded-full object-cover"
          />
        </div>

        <div className="flex mt-4 relative right-9 flex-col items-start justify-start text-white font-semibold space-y-4">
          <Link to={`/users/${userName}/username`}>
            <h1>Profile</h1>
          </Link>
          <Link to={`/users/${userName}/username`}>
            <h1>Favorite Movies</h1>
          </Link>
          <Link to={`/users/${userName}/username`}>
            <h1>Watchlist Movies</h1>
          </Link>
          <h1 onClick={handleLogOut}>
            Log Out{' '}
            <span>
              <ion-icon
                name="log-out"
                style={{
                  fontSize: '20px',
                  position: 'relative',
                  top: '5px',
                }}
              ></ion-icon>
            </span>
          </h1>
        </div>
        <SearchBar />
      </div>
    </>
  )
}

export default LoginMobileHeader
