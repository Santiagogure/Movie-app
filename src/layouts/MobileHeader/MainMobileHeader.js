import React, { useState, useContext, useRef } from 'react'
import { AppContext } from '../../context/dataProvider'
import { useNavigate } from 'react-router-dom'
import LoginMobileHeader from './LoginMobileHeader'
import MobileHeader from './MobileHeader'

const MainMobileHeader = () => {
  const { menuIsVisible, isLogin } = useContext(AppContext)

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
