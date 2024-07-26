import React, { useCallback, useEffect, useState } from 'react'
import HomeStore, { fetchPopularMovies, getMovieDetails, searchMovies } from './HomeStore';
import './Home.css';
import { Card, Col, message, Row } from 'antd';
import Meta from 'antd/es/card/Meta';
import MovieModal from '../Components/MovieModal';
import Search from 'antd/es/input/Search';
import debounce from 'lodash.debounce';

const Home = () => {
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchMovies = async () => {
      const data = await fetchPopularMovies();
      console.log(data);
      setMovies(data);
    };

    fetchMovies();
  }, []);

  const handleCardClick = async (movie) => {
    const details = await getMovieDetails(movie.imdbID);
    setSelectedMovie(details);
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setSelectedMovie(null);
  };

  const handleSearch = useCallback(debounce(async (value) => {
    setSearchTerm(value);
    if (value) {
      const data = await searchMovies(value);
      if (data.length === 0) {
        message.warning('No results found. Please refine your search.');
      }
      setMovies(data);
    } else {
      setMovies(movies);
    }
  }, 500), [movies]);

  return (
    <div style={{ padding: '20px' }}>
      <h1>Discover Your Next Favorite Movie</h1>
      <Search
        placeholder="Search for movies"
        onSearch={handleSearch}
        onChange={(e) => handleSearch(e.target.value)}
        style={{ marginBottom: '20px', maxWidth: '400px' }}
        enterButton
      />
      <Row gutter={[16, 16]}>
        {movies.map((movie) => (
          <Col
            key={movie.imdbID}
            xs={24} // 1 column for mobile
            sm={12} // 2 columns for small devices
            md={8} // 3 columns for tablets
            lg={6} // 4 columns for laptops
          >
            <Card
              hoverable
              cover={<img alt={movie.Title} src={movie.Poster} />}
              onClick={() => handleCardClick(movie)}
            >
              <Meta title={movie.Title} description={`Year: ${movie.Year}`} />
            </Card>
          </Col>)
        )}
      </Row>
      {selectedMovie && <MovieModal selectedMovie={selectedMovie} isModalVisible={isModalVisible} handleCancel={handleCancel} />}
    </div>
  );
}

export default Home