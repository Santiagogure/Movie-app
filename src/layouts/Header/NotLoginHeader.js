import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { AppContext } from '../../context/dataProvider'

export const NotLoginHeader = () => {
  const { setMenuIsVisible, menuIsVisible } = useContext(AppContext)
  return (
    <>
      <Link className="w-full lg:flex hidden relative right-7" to="/login">
        Login/Register
      </Link>
      <div className="lg:hidden flex">
        <ion-icon
          onClick={() => setMenuIsVisible(!menuIsVisible)}
          style={{ fontSize: '30px' }}
          name="menu"
        ></ion-icon>
      </div>
    </>
  )
}
