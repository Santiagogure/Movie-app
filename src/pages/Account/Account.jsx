import React, { useContext, useState, useEffect } from 'react'
import { AppContext } from '../../context/dataProvider'
import axios from 'axios'
import { Categories } from './Categories'

const Account = () => {
  const {
    setMenuIsVisible,
    userName,
    setUserName,
    isLogin,
    getFavorites,
    getWatchlist,
    imageUrl,
    setImageUrl,
  } = useContext(AppContext)
  const [activeTab, setActiveTab] = useState('favorite')
  const [newUser, setNewUser] = useState('')
  const [edit, setEdit] = useState(false)

  const handleUpdateUsername = async () => {
    try {
      await axios.put(`http://localhost:4000/users/${userName}/username`, {
        username: newUser,
      })
      localStorage.setItem('username', newUser)
      setUserName(newUser)
    } catch (error) {
      console.error(error)
    }
  }

  const handleImageUpload = async (event) => {
    try {
      const file = event.target.files[0]
      const reader = new FileReader()
      reader.readAsDataURL(file)
      reader.onloadend = () => {
        setImageUrl(reader.result)
      }
      await axios.post(`http://localhost:4000/users/${userName}/image`, {
        image: imageUrl,
      })
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    setMenuIsVisible(false)
    window.scroll({ top: 0, left: 0, behavior: 'smooth' })
  }, [])

  useEffect(() => {
    if (isLogin) {
      getFavorites()
      getWatchlist()
    }
  }, [isLogin])

  return (
    <div className="h-full rounded-lg">
      <div className="h-[120px] left-0 right-0 top-0 relative">
        <div className="overlay-film-cover"></div>
        <div className="h-full w-full bg-primary"></div>
      </div>
      <div className="relative bottom-16">
        <div className="flex items-center justify-center">
          <label
            htmlFor="image-upload"
            className="relative cursor-pointer rounded-full overflow-hidden w-32 h-32 border-4 border-gray-300 hover:border-gray-400 transition duration-300"
          >
            {imageUrl ? (
              <img
                src={imageUrl}
                alt="User profile"
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="flex items-center justify-center w-full h-full text-gray-400 font-bold text-2xl">
                <span>+</span>
              </div>
            )}
            <input
              type="file"
              id="image-upload"
              className="sr-only"
              onChange={handleImageUpload}
            />
          </label>
        </div>
        <div className="flex justify-center space-x-5 mt-4">
          {edit ? (
            <form className="mt-2" onSubmit={handleUpdateUsername(newUser)}>
              <input
                onChange={(event) => setNewUser(event.target.value)}
                className="text-black px-2"
              ></input>
            </form>
          ) : (
            <h1 className="flex items-center justify-center text-2xl  text-white font-bold">
              {userName}
            </h1>
          )}

          <button
            onClick={() => setEdit(!edit)}
            className="bg-gray-100 hover:bg-gray-200 rounded-full p-2 "
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 text-gray-600"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M14.293 3.293a1 1 0 011.414 0l2 2a1 1 0 010 1.414l-8 8a1 1 0 01-.665.277l-3 1a1 1 0 01-1.246-1.246l1-3a1 1 0 01.277-.665l8-8zM13 6l1.293 1.293-7.586 7.586-1.293-1.293 7.586-7.586zM4.707 14.707l-1.414 1.414a1 1 0 01-1.414-1.414l1.414-1.414a1 1 0 011.414 1.414z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </div>
        <Categories
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          getWatchlist={getWatchlist}
          getFavorites={getFavorites}
        />
      </div>
    </div>
  )
}

export default Account
