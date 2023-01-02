import React, { useContext, useEffect } from 'react'
import { AppContext } from '../context/dataProvider'
import { Chip, getNativeSelectUtilityClasses } from '@mui/material'

const Genre = ({}) => {
   
    const value = useContext(AppContext)
    const genres = value.genres
    const setGenres = value.setGenres
    const selectedGenre = value.selectedGenre
    const setSelectedGenre = value.setSelectedGenre
    const setPage = value.setPage



    const handleAddGenre = (genre) => {
         setSelectedGenre([...selectedGenre, genre])
         setGenres(genres.filter((g) => g.id !== genre.id))
    }

    const handleDeleteGenre = (genre) => {
       setSelectedGenre(selectedGenre.filter((g) => g.id !== genre.id ))
       setGenres([...genres, genre])
       setPage(1)
    }
 
    return (
        <div style={{ padding: "6px 0", color: 'white' }}>
            {/* <h1>Discover Movies</h1>
            {
            selectedGenre &&            
            selectedGenre.map((genre) => (
            <Chip
              style={{ margin: 5}}
              label={genre.name}
              key={genre.id}
              color="secondary"
              clickable
              size="small"
              id="genre"
              onClick={() => handleDeleteGenre(genre)}
            />
          ))}
          {genres.map((genre) => (
            <Chip
              style={{ margin: 5}}
              label={genre.name}
              key={genre.id}
              color="primary"
              clickable
              size="small"
              id="genre"
              onClick={() => handleAddGenre(genre)}
            />
          ))} */}
        </div>
      );
}

export default Genre