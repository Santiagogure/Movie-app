const useSeriesGen = (selectedGenre) => {
    if(selectedGenre.length < 1) return ''

    const genreID = selectedGenre.map((g) => g.id)
    return genreID.reduce((acc, curr) => acc + "," + curr)
}


export default useSeriesGen;  