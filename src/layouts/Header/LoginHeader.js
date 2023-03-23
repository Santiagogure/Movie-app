import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { AppContext } from '../../context/dataProvider'
import LogOut from '../../pages/Account/LogOut'

export const LoginHeader = () => {
  const { userName, setMenuIsVisible, menuIsVisible } = useContext(AppContext)

  return (
    <div className="flex items-center justify-center space-x-5">
      <Link className="" to={`/users/${userName}/username`}>
        {userName.length < 14
          ? userName[0].toUpperCase() + userName.slice(1)
          : userName[0].toUpperCase() + userName.slice(1, 12) + '...'}
      </Link>
      <LogOut />
      <div className="lg:hidden flex">
        <ion-icon
          onClick={() => setMenuIsVisible(!menuIsVisible)}
          style={{ fontSize: '30px' }}
          name="menu"
        ></ion-icon>
      </div>
    </div>
  )
}
