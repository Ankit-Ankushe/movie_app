const apiKey = "3c861c38"
const popularMovies = ["The Shawshank Redemption","The Godfather","The Dark Knight","The Godfather Part II","12 Angry Men","Schindler's List","The Lord of the Rings","Pulp Fiction","The Lord of the Rings: The Fellowship of the Ring","The Good, the Bad and the Ugly","Forrest Gump","The Lord of the Rings: The Two Towers","Fight Club","Inception","Star Wars: Episode V - The Empire Strikes Back","The Matrix","Goodfellas","One Flew Over the Cuckoo's Nest","Se7en","Interstellar","It's a Wonderful Life","Seven Samurai","The Silence of the Lambs","Saving Private Ryan","City of God","Life Is Beautiful","The Green Mile","Terminator 2: Judgment Day","Star Wars: Episode IV - A New Hope","Back to the Future"
];

export const fetchPopularMovies = async () => {
  const movieData = await Promise.all(
    popularMovies.map(async (title) => {
      const response = await fetch(`http://www.omdbapi.com/?t=${encodeURIComponent(title)}&apikey=${apiKey}`);
      const data = await response.json();
      return data;
    })
  );
  return movieData;
};
export const getMovieDetails = async (movieId) => {
  try {
    const response = await fetch(`http://www.omdbapi.com/?i=${encodeURIComponent(movieId)}&apikey=${apiKey}`);
    const data = await response.json();
    if (data.Response === "True") {
      return data;
    } else {
      console.error("Error fetching movie details:", data.Error);
      return null;
    }
  } catch (error) {
    console.error("Error fetching movie details:", error);
    return null;
  }
};
export const searchMovies = async (query) => {
  try {
    const response = await fetch(`http://www.omdbapi.com/?s=${encodeURIComponent(query)}&apikey=${apiKey}`);
    const data = await response.json();
    if (data.Response === "True") {
      return data.Search || [];
    } else {
      return []; // Return an empty array if there is an error
    }
  } catch (error) {
    console.error("Error fetching movie data:", error);
    return [];
  }
};
