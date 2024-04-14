import axios from 'axios';
import { IMovie } from '../Models/Movies';

const FetchMovieData = (activeKey: string) => {
  return axios.get<IMovie[]>(`http://localhost:4000/movies-coming`)
    .then(response => {
      const data = response.data
      return data;
    })
}

const addMovieToFavourites = (movie: IMovie) => {
  return axios.post<IMovie>(
    'http://localhost:4000/favourite',
    movie,
    {
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(response => response.data)
}

const removeMovieFromFavourites = (id: string) => {
  axios.delete(`http://localhost:4000/favourite`)
    .then(response => {
      const data = response.data
      return data;
    })
}

export { FetchMovieData, addMovieToFavourites, removeMovieFromFavourites }