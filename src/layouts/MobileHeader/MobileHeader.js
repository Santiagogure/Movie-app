import React, { useContext } from 'react'
import { AppContext } from '../../context/dataProvider'
import { Link } from 'react-router-dom'
import { SearchBar } from '../../components/Common/SearchBar'

const MobileHeader = () => {
  const { setMenuIsVisible } = useContext(AppContext)

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

        <div className="flex mt-14 relative right-9 flex-col items-start justify-start text-white font-semibold space-y-4">
          <Link to="/login">
            <h1>Log In</h1>
          </Link>
          <Link to="/signup">
            <h1>Register</h1>
          </Link>
        </div>
        <SearchBar />
      </div>
    </>
  )
}

export default MobileHeader
