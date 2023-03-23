import React, { useContext } from 'react'
import { AppContext } from '../../context/dataProvider'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

export const Categories = ({
  activeTab,
  setActiveTab,
  getWatchlist,
  getFavorites,
}) => {
  const navigate = useNavigate()
  const {
    userFavorites,
    setUserFavorites,
    userWatchlist,
    setUserWatchlist,
    userName,
  } = useContext(AppContext)

  const handleDeleteFavorite = async (id) => {
    try {
      await axios.delete(
        `http://localhost:4000/users/${userName}/favorites/${id}`,
        {
          username: userName,
          movie_id: id,
        },
        setUserFavorites(
          userFavorites.filter((userFav) => userFav.movie_id !== id)
        )
      )
      getFavorites()
    } catch (error) {}
  }

  const handleDeleteWatchlist = async (id) => {
    try {
      const response = await axios.delete(
        `http://localhost:4000/users/${userName}/watchlist/${id}`,
        {
          username: userName,
          movie_id: id,
        },
        setUserWatchlist(
          userWatchlist.filter((userWatch) => userWatch.movie_id !== id)
        )
      )
      console.log(response)
      getWatchlist()
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className="max-w-md mx-auto p-4 lg:p-0">
      <div className="mt-12  flex border-b border-gray-200">
        <button
          className={`${
            activeTab === 'favorite'
              ? 'border-indigo-500 text-white'
              : 'border-transparent text-white hover:text-gray-700 hover:border-gray-300'
          } flex-1 inline-flex items-center justify-center px-4 py-2 border-b-2 font-medium text-sm`}
          onClick={() => setActiveTab('favorite')}
        >
          Favorite Movies
        </button>
        <button
          className={`${
            activeTab === 'watchlist'
              ? 'border-indigo-500 text-white'
              : 'border-transparent text-white hover:text-gray-700 hover:border-gray-300'
          } flex-1 inline-flex items-center justify-center px-4 py-2 border-b-2 font-medium text-sm`}
          onClick={() => setActiveTab('watchlist')}
        >
          Watchlist Movies
        </button>
      </div>
      <div className="p-4 lg:pt-4">
        {activeTab === 'favorite' && (
          <div>
            <h2 className="text-lg  text-white font-bold">Favorite Movies</h2>
            {userFavorites.length >= 1 ? (
              <p className="mt-1 text-sm text-white ">
                Here are some of the movies on your watchlist:
              </p>
            ) : (
              <p className="mt-1 text-sm text-white ">
                You don't have any favorite movie yet
              </p>
            )}
            <ul className="mt-2 text-sm text-white">
              {userFavorites
                ? userFavorites?.map((favorites, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between"
                    >
                      <li
                        key={index}
                        onClick={() =>
                          navigate(`/${favorites.type}/${favorites.movie_id}`)
                        }
                        className="cursor-pointer my-2"
                      >
                        {favorites.name}
                      </li>
                      <h1
                        onClick={() => handleDeleteFavorite(favorites.movie_id)}
                        className="text-white font-bold cursor-pointer"
                      >
                        X
                      </h1>
                    </div>
                  ))
                : ''}
            </ul>
          </div>
        )}
        {activeTab === 'watchlist' && (
          <div>
            <h2 className="text-lg  text-white font-bold">Watchlist Movies</h2>
            {userWatchlist.length >= 1 ? (
              <p className="mt-1 text-sm text-white ">
                Here are some of the movies on your watchlist:
              </p>
            ) : (
              <p className="mt-1 text-sm text-white ">
                You don't have any movie on your watchlist yet
              </p>
            )}
            <ul className="mt-2 text-sm text-white">
              {userWatchlist
                ? userWatchlist?.map((watchlist, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between"
                    >
                      <li
                        key={index}
                        onClick={() =>
                          navigate(`/${watchlist.type}/${watchlist.movie_id}`)
                        }
                        className="cursor-pointer my-2"
                      >
                        {watchlist.name}
                      </li>
                      <h1
                        onClick={() =>
                          handleDeleteWatchlist(watchlist.movie_id)
                        }
                        className="text-white font-bold cursor-pointer"
                      >
                        X
                      </h1>
                    </div>
                  ))
                : ''}
            </ul>
          </div>
        )}
      </div>
    </div>
  )
}
