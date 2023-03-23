import { useEffect, useRef, useState, useContext } from 'react'
import {
  useLocation,
  useNavigate,
  useParams,
  useSearchParams,
} from 'react-router-dom'

import { discover, getTopRated, search } from '../../api/api'
import { Card } from '../../components/Common/Card'
import { Section } from '../../components/Section'
import { Film } from '../../interfaces'
import { MediaType } from '../../types'
import { tmdbImageSrc } from '../../utils'
import { AppContext } from '../../context/dataProvider'

interface Props {
  type: MediaType | 'search' | 'list'
}

export const Catalog = (props: Props) => {
  let title = ''
  let filter = ''
  let request: (page: number) => Promise<{
    totalPages: number
    films: Film[]
  }>

  const { menuIsVisible, setMenuIsVisible } = useContext(AppContext)
  const [films, setFilms] = useState<Film[]>([])
  const [filterFilms, setFilteredFilms] = useState<Film[]>([])
  const [params, _] = useSearchParams()
  const page = useRef(1)
  const totalPage = useRef(2)
  const loadingRef = useRef(false)
  const [onLoading, setOnLoading] = useState(false)
  const location = useLocation()
  const navigate = useNavigate()
  const { listTitle } = useParams<any>()

  switch (props.type) {
    case 'movie':
      title = 'Movies'
      request = (page: number) => discover('movie', page)
      break

    case 'tv':
      title = 'TV'
      request = (page: number) => discover('tv', page)
      break

    case 'search':
      title = `Results for <i>${
        params.get('q')
          ? params.get('q')?.length ?? 0 > 14
            ? params.get('q')?.slice(0, 9) + '...'
            : params.get('q')
          : ''
      }</i>  ${
        filterFilms.length > 0
          ? 'in' +
            ' ' +
            filterFilms[0].mediaType[0].toUpperCase() +
            filterFilms[0].mediaType.slice(1)
          : ''
      } `
      filter = `${(
        <div>
          <h1 onClick={() => filterByMediaType('movie')}>Movie</h1>
          <h1 onClick={() => filterByMediaType('tv')}>TV</h1>
        </div>
      )}`
      request = (page: number) => search(params.get('q') || '', page)
      break

    case 'list':
      title = listTitle as string

      if (title === 'top-rated-tv') {
        request = (page: number) => getTopRated('tv', page)
      } else if (title === 'top-rated-movies') {
        request = (page: number) => getTopRated('movie', page)
      }
      break

    default:
      break
  }

  const fetch = async () => {
    loadingRef.current = true
    setOnLoading(true)

    const { films, totalPages } = await request(page.current)

    setOnLoading(false)
    loadingRef.current = false

    totalPage.current = totalPages
    setFilms((arrs) => [...arrs, ...films])
  }

  const onWindowScroll = () => {
    if (loadingRef.current) return

    if (window.innerHeight + window.scrollY >= document.body.scrollHeight) {
      if (totalPage.current > page.current) {
        page.current++
        fetch()
      }
    }
  }

  useEffect(() => {
    setMenuIsVisible(false)
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth',
    })
    setFilteredFilms(films)
  }, [films])

  useEffect(() => {
    setFilms([])
    fetch()
  }, [location])

  useEffect(() => {
    window.addEventListener('scroll', onWindowScroll)

    return () => {
      window.removeEventListener('scroll', onWindowScroll)
    }
  }, [])

  const filterByMediaType = (mediaType: string) => {
    setFilteredFilms(films.filter((film) => film.mediaType === mediaType))
    console.log(filterFilms)
  }

  return (
    <>
      <div className="h-[120px] left-0 right-0 top-0 relative">
        <div className="overlay-film-cover"></div>
        <div className="h-full w-full bg-primary"></div>
      </div>

      <Section
        className="-mt-[90px] space-x-5 flex items-center justify-between relative z-10"
        title={title}
        filter={filter}
        showFilter={true}
        filterByMediaType={filterByMediaType}
      ></Section>

      <Section>
        <div className="grid lg:grid-cols-5 sm:grid-cols-4 mobile:grid-cols-2 relative z-[11]  ">
          {filterFilms.length > 0
            ? filterFilms.map((film, i) => (
                <div className="mx-[0.50rem]" key={i}>
                  <Card
                    onClick={() => navigate(`/${film.mediaType}/${film.id}`)}
                    imageSrc={tmdbImageSrc(film.posterPath)}
                    title={film.title}
                    key={i}
                    onView={false}
                  ></Card>
                </div>
              ))
            : ''}
        </div>
      </Section>
    </>
  )
}
