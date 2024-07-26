const apiKey = process.env.REACT_APP_OMDB_API_KEY;
console.log("API Key:", process.env.REACT_APP_OMDB_API_KEY);
const popularMovies = ["The Shawshank Redemption","The Godfather","The Dark Knight","The Godfather Part II","12 Angry Men","Schindler's List","The Lord of the Rings","Pulp Fiction","The Lord of the Rings: The Fellowship of the Ring","The Good, the Bad and the Ugly","Forrest Gump","The Lord of the Rings: The Two Towers","Fight Club","Inception","Star Wars: Episode V - The Empire Strikes Back","The Matrix","Goodfellas","One Flew Over the Cuckoo's Nest","Se7en","Interstellar","It's a Wonderful Life","Seven Samurai","The Silence of the Lambs","Saving Private Ryan","City of God","Life Is Beautiful","The Green Mile","Terminator 2: Judgment Day","Star Wars: Episode IV - A New Hope","Back to the Future"
];


export const fetchPopularMovies = async () => {
  try {
    const movieData = await Promise.all(
      popularMovies.map(async (title) => {
        const response = await fetch(`http://www.omdbapi.com/?t=${encodeURIComponent(title)}&apikey=${apiKey}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          }
        });
        const data = await response.json();
        console.log("Popular Movie Response:", data); // Debug log
        if (data.Response === "True") {
          return data;
        } else {
          console.error("Error fetching popular movie:", data.Error);
          return null;
        }
      })
    );
    return movieData.filter(movie => movie !== null);
  } catch (error) {
    console.error("Error fetching popular movies:", error);
    return [];
  }
};

export const getMovieDetails = async (movieId) => {
  try {
    const response = await fetch(`http://www.omdbapi.com/?i=${encodeURIComponent(movieId)}&apikey=${apiKey}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    });
    const data = await response.json();
    console.log("Movie Details Response:", data); // Debug log
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
    const response = await fetch(`http://www.omdbapi.com/?s=${encodeURIComponent(query)}&apikey=${apiKey}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    });
    const data = await response.json();
    console.log("Search Movies Response:", data); // Debug log
    if (data.Response === "True") {
      return data.Search || [];
    } else {
      console.error("Error searching movies:", data.Error);
      return [];
    }
  } catch (error) {
    console.error("Error searching movies:", error);
    return [];
  }
};
