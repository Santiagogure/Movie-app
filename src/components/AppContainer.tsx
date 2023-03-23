import { createContext, useContext, useEffect, useState } from 'react'
import { BrowserRouter } from 'react-router-dom'

import { getGenres } from '../api/api'
import { Genre } from '../interfaces'
import { Body } from '../layouts/Router'

import { MediaType } from '../types'
import { Loading } from './Common/Loading'
import Footer from '../layouts/Footer/Footer.js'
import DataProvider from '../context/dataProvider'
import MainMobileHeader from '../layouts/MobileHeader/MainMobileHeader.js'
import { Header } from '../layouts/Header/Header.js'

type Genres = {
  [key in MediaType]: Genre[]
}

const GlobalContext = createContext<{
  genres: Genres
}>({
  genres: {
    movie: [],
    tv: [],
  },
})

export const useGlobalContext = () => useContext(GlobalContext)

export const AppContainer = () => {
  const [loading, setLoading] = useState(true)

  setTimeout(() => {
    setLoading(false)
  }, 2400)

  const [genres, setGenres] = useState<Genres>({
    movie: [],
    tv: [],
  })

  const fetchGenres = async () => {
    const movie = await getGenres('movie')
    const tv = await getGenres('tv')

    setGenres({
      movie,
      tv,
    })
  }

  useEffect(() => {
    setLoading(true)
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth',
    })
    fetchGenres()
  }, [])

  setTimeout(() => {
    setLoading(false)
  }, 1500)

  if (loading) {
    return (
      <div className=" mt-[25%] flex items-center justify-center">
        <Loading></Loading>
      </div>
    )
  }

  return (
    <BrowserRouter>
      <DataProvider>
        <GlobalContext.Provider
          value={{
            genres,
          }}
        >
          <Header />
          <MainMobileHeader />
          <Body />
          {loading ? '' : <Footer />}
        </GlobalContext.Provider>
      </DataProvider>
    </BrowserRouter>
  )
}
