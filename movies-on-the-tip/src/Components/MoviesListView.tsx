import React, { useState, useEffect } from 'react';
import Movie from './MovieView';
import { IMovie } from '../Models/Movies';
import { FetchMovieData } from '../Services/MovieServices';
import { Row, Col, ToastContainer, Toast } from 'react-bootstrap';
import { addMovieToFavourites, removeMovieFromFavourites } from '../Services/MovieServices';
import { faCheckCircle, faCircleXmark } from '@fortawesome/free-regular-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

type Props = {
  activeKey: string,
  searchValue: string | null
}

const MoviesListView = ({ activeKey, searchValue }: Props) => {
  const [movies, setMovies] = useState<IMovie[]>([]);
  const [status, setStatus] = useState<'loading' | 'loaded' | 'error'>('loading');
  const [toastMessage, setToastMessage] = useState<string>('');
  const [show, setShow] = useState<boolean>(false);

  const addToFavourites = async (movie: IMovie) => {
    setStatus('loading');
    try {
      const data = await addMovieToFavourites(movie);
      console.log("movie added to favourites successfully");
      setStatus('loaded');
      setShow(true);
      setToastMessage('Successfully added to favourites');
    }
    catch (error) {
      setStatus('error');
      setShow(true);
      setToastMessage("Already added to favourites");
    }
  }

  const removeFromFavourites = async (id: string) => {
    setStatus('loading');
    try {
      const data = await removeMovieFromFavourites(id);
      console.log("movie removed from favourites");
      setStatus('loaded');
      setShow(true);
      setToastMessage('Successfully removed from favourites');
      setMovies(prevMovies => prevMovies.filter(movie => movie.id !== id));
      
    }
    catch (error) {
      setStatus('error');
      setShow(true);
    //   setToastMessage(error.message);
    }
  }

  useEffect(() => {
    const fetchMovies = async () => {
      const data = await FetchMovieData(activeKey);
      console.log(data);
      console.log(activeKey)
      setMovies(data);
    }
    fetchMovies();
  }, [activeKey])

  const filteredMovies = movies.filter((movie: IMovie) => {
    return movie.title.toLowerCase().includes((searchValue || '').toLowerCase());
  });

  return (
    <>
      <Row xs={1} md={3} lg={6}>
        {
          filteredMovies.length !== 0 ?
            filteredMovies.map((movie: IMovie) => {
              return (
                <Col key={movie.id} className="d-flex aligh-items-stretch my-3">
                  <Movie movie={movie} activeKey={activeKey} addToFavourites={addToFavourites} removeFromFavourites={removeFromFavourites}></Movie>
                </Col>
              )
            }) :
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '80vh', width: '98vw' }}>
              <h4>No Data found</h4>
            </div>
        }
      </Row>
      {
        status !== 'loading' && (
          <ToastContainer className="p-3" position="top-end">
            <Toast show={show} autohide delay={5000} onClose={() => { setShow(false) }}>
              <Toast.Header closeButton={true}>
                <FontAwesomeIcon icon={status === 'error' ? faCircleXmark : faCheckCircle} className='mx-2' style={{ color: status === 'error' ? 'red' : 'green' }}></FontAwesomeIcon>
                <strong className="me-auto">{status === 'error' ? 'Error' : 'Success'}</strong>
              </Toast.Header>
              <Toast.Body>{toastMessage}</Toast.Body>
            </Toast>
          </ToastContainer>
        )
      }
    </>
  );
}

export default MoviesListView;