import { useEffect, useState, useContext } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom'

import {
  getCasts,
  getDetail,
  getRecommendations,
  getTrailers,
} from '../../api/api'
import { useGlobalContext } from '../../components/AppContainer'
import { Card } from '../../components/Common/Card'
import { Image } from '../../components/Common/Image'
import { Loading } from '../../components/Common/Loading'
import { Section } from '../../components/Section'
import { Slider } from '../../components/slider/slider'
import { TrailerModal } from '../../components/Common/Trailer'
import { Cast, Film as FilmInterface, Trailer } from '../../interfaces'
import { MediaType } from '../../types'
import { tmdbImageSrc, youtubeThumbnail } from '../../utils'
import axios from 'axios'
import { AppContext } from '../../context/dataProvider'

interface Props {
  mediaType: MediaType
}

export const Film = (props: Props) => {
  const {
    isLogin,
    userName,
    userFavorites,
    setUserFavorites,
    userWatchlist,
    setUserWatchlist,
  } = useContext(AppContext)
  const location = useLocation()
  const navigate = useNavigate()
  const { id } = useParams<any>()

  const [film, setFilm] = useState<FilmInterface | null | undefined>(null)
  const [trailerSrc, setTrailerSrc] = useState('')
  const [addedFav, setAddedFav] = useState(false)
  const [addedWatch, setAddedWatch] = useState(false)

  const playTrailer = async (key: string) => {
    setTrailerSrc(`https://www.youtube.com/embed/${key}?autoplay=1`)
  }

  const [casts, setCasts] = useState<Cast[]>([])
  const [trailers, setTrailers] = useState<Trailer[]>([])
  const [recommendations, setRecommendations] = useState<FilmInterface[]>([])

  const globalContext = useGlobalContext()

  const fetch = async () => {
    const film = await getDetail(props.mediaType, parseInt(id as string))

    if (film) {
      setFilm(film)
      setCasts(await getCasts(film.mediaType, film.id))
      setTrailers(await getTrailers(film.mediaType, film.id))
      setRecommendations(await getRecommendations(film.mediaType, film.id))
    }
  }

  useEffect(() => {
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth',
    })
    setFilm(undefined)
    fetch()
  }, [location])

  if (film === null) {
    // redirect to 404 page
    return <></>
  } else if (film === undefined) {
    return (
      <div className="text-center p-6 h-full flex-1">
        <Loading></Loading>
      </div>
    )
  }

  const movie_id = film.id
  const name = film.title
  const type = film.mediaType

  const addFavoriteMovie = () => {
    if (isLogin) {
      if (
        userFavorites?.some((favorite: any) => favorite.movie_id == movie_id)
      ) {
        setAddedFav(true)
      }
      axios
        .post(`http://localhost:4000/${userName}/favorites`, {
          movie_id,
          name,
          type,
        })
        .then((response) => {
          console.log(response.data) // Pelicula agregada a la lista de favoritos
          setUserFavorites([...(userFavorites || []), film])
        })
        .catch((error) => {
          console.error(error)
        })
    }
  }

  const addWatchlistMovie = () => {
    if (
      userWatchlist?.some((watchlist: any) => watchlist.movie_id == movie_id)
    ) {
      setAddedWatch(true)
    }
    axios
      .post(`http://localhost:4000/${userName}/watchlist`, {
        movie_id,
        name,
        type,
      })
      .then((response) => {
        console.log(response.data) // Pelicula agregada a la lista de favoritos
        setUserWatchlist([...userWatchlist, film])
      })
      .catch((error) => {
        console.error(error)
      })
  }

  return (
    <>
      <TrailerModal
        onHide={() => setTrailerSrc('')}
        src={trailerSrc}
      ></TrailerModal>
      <div className="h-[300px] left-0 right-0 top-0 relative">
        <div className="overlay-film-cover"></div>
        <Image
          src={tmdbImageSrc(film.coverPath)}
          className="rounded-0 rounded-none"
        ></Image>
      </div>

      <Section className="-mt-[150px] flex flex-col items-center justify-center relative z-10 mobile:block">
        <Image
          src={tmdbImageSrc(film.posterPath)}
          className="w-[200px] min-w-[200px] h-[300px] mobile:mx-auto"
        ></Image>
        <div className="px-3 flex flex-col items-center justify-start gap-3">
          <p className="line-clamp-1 mt-2 text-2xl">{film.title}</p>
          <ul className="flex items-center gap-3 mt-3">
            {film.genreIds.map((id, i) => (
              <li
                key={id}
                className="px-3 py-1.5 bg-primary rounded-full text-sm"
              >
                {
                  globalContext.genres[film.mediaType]?.find((g) => g.id === id)
                    ?.name
                }
              </li>
            ))}
          </ul>
          <p className="line-clamp-3 opacity-[0.9] mt-3">{film.description}</p>
          <div className="flex items-center space-x-5 mt-3">
            {addedFav ? (
              <button className="px-3 py-1.5 bg-[crimson] hover:bg-header transition rounded-lg text-sm cursor-pointer">
                This movie is on the list
              </button>
            ) : (
              <button
                onClick={addFavoriteMovie}
                className="px-3 py-1.5 bg-primary hover:bg-header transition rounded-lg text-sm cursor-pointer"
              >
                Add to favorites
              </button>
            )}

            {addedWatch ? (
              <button className="px-3 py-1.5 bg-[crimson] hover:bg-header transition rounded-lg text-sm cursor-pointer">
                This movie is on the list
              </button>
            ) : (
              <button
                onClick={addWatchlistMovie}
                className="px-3 py-1.5 bg-primary hover:bg-header transition rounded-lg text-sm cursor-pointer"
              >
                Add to Watchlist
              </button>
            )}
          </div>
        </div>
      </Section>
      {/* cast */}
      <Section title="Casts" hidden={casts.length === 0}>
        <div className="scrollbar scrollbar-thumb-primary scrollbar-track-header">
          <div className="flex items-center gap-3">
            {casts.map((cast, i) => (
              <div className="flex-shrink-0 w-[200px] mb-6" key={i}>
                <Card
                  withPlay={false}
                  imageSrc={tmdbImageSrc(cast.profilePath)}
                >
                  <p className="font-semibold">{cast.name}</p>
                  <p className="opacity-[0.9] text-sm">{cast.characterName}</p>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </Section>

      <Section title="Trailers" hidden={trailers.length === 0}>
        <div className="scrollbar scrollbar-thumb-primary scrollbar-track-header">
          <div className="flex items-center gap-3 h-[300px]">
            {trailers.map((trailer, i) => (
              <Card
                onClick={() => playTrailer(trailer.key)}
                imageSrc={youtubeThumbnail(trailer.key)}
                className="flex-shrink-0"
                key={i}
              ></Card>
            ))}
          </div>
        </div>
      </Section>

      <Section title="Seasons" hidden={film.seasons.length === 0}>
        <Slider
          slidesToShow={film.seasons.length > 2 ? 2 : 1}
          slidesToScroll={film.seasons.length > 2 ? 2 : 1}
          swipe={false}
        >
          {(_) =>
            film.seasons.map((season, i) => (
              <Card
                className="h-[300px]"
                onClick={() =>
                  navigate(`/tv/${film.id}/season/${season.seasonNumber}`)
                }
                title={season.name}
                imageSrc={tmdbImageSrc(season.posterPath)}
                key={i}
              ></Card>
            ))
          }
        </Slider>
      </Section>

      <Section title="Recommendations" hidden={recommendations.length === 0}>
        <Slider isMovieCard={true}>
          {(_) =>
            recommendations
              .slice(0, 10)
              .map((film, i) => (
                <Card
                  onClick={() => navigate(`/${props.mediaType}/${film.id}`)}
                  title={film.title}
                  imageSrc={tmdbImageSrc(film.posterPath)}
                  key={i}
                ></Card>
              ))
          }
        </Slider>
      </Section>
    </>
  )
}
