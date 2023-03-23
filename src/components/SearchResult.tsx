import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { search } from '../api/api'
import { Film } from '../interfaces'
import { tmdbImageSrc } from '../utils'
import { useGlobalContext } from './AppContainer'
import { Image } from './Common/Image'

interface Props {
  keyword: string
  goToSearchPage: Function
}

export const SearchResult = ({ keyword }: Props) => {
  const [items, setItems] = useState<Film[]>([])
  const globalContext = useGlobalContext()
  const navigate = useNavigate()

  const searchTimeout = useRef<NodeJS.Timeout>()

  useEffect(() => {
    const fetch = async () => {
      if (!keyword) return

      clearTimeout(searchTimeout.current)

      searchTimeout.current = setTimeout(async () => {
        const res = await search(keyword)
        setItems(res.films)
      }, 120)
    }

    fetch()
  }, [keyword])

  return (
    <div
      className="
            absolute
            top-[48px]
            left-0
            right-0
            rounded-md
            bg-header
            shadow-lg
        "
    >
      <div className="max-h-[480px] scrollbar scrollbar-thumb-primary scrollbar-track-header pr-3">
        {items.map((film, i) => (
          <div
            key={i}
            className="flex items-start p-1.5 rounded-lg hover:bg-primary cursor-pointer m-1.5"
            onClick={() => navigate(`/${film.mediaType}/${film.id}`)}
          >
            {/* image */}
            <Image
              src={tmdbImageSrc(film.posterPath)}
              className="h-[100px] max-w-[140px] w-[102px] rounded-md "
            ></Image>
            {/* title and genres */}
            <div className="px-3 truncate">
              <p className="text-base truncate">{film.title}</p>
              <ul className="flex flex-wrap gap-x-1.5 text-sm opacity-[0.7]">
                {film.genreIds.map((id, i) => (
                  <li key={i}>
                    {
                      globalContext.genres[film.mediaType].find(
                        (g) => g.id === id
                      )?.name
                    }{' '}
                    {i !== film.genreIds.length - 1 ? ',' : ''}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
