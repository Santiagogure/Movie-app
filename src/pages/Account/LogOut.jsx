import React, { useContext } from 'react'
import { AppContext } from '../../context/dataProvider'
import 'boxicons'

const LogOut = () => {
  const { setIsLogin } = useContext(AppContext)

  const handleLogOut = () => {
    localStorage.clear()
    setIsLogin(false)
  }

  return (
    <>
      <button
        className="lg:flex hidden rounded-md  py-2 "
        onClick={handleLogOut}
      >
        <ion-icon style={{ fontSize: '25px' }} name="log-out"></ion-icon>
      </button>
    </>
  )
}

export default LogOut
