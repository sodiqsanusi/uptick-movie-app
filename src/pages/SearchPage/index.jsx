import { useState } from 'react';
import {Link, useNavigate, useParams} from 'react-router-dom';
import Filter from '../../components/Filter';
import LoadSpinner from '../../components/LoadSpinner';
import MoviesGrid from '../../components/MoviesGrid';
import SearchMovie from '../../components/SearchMovie';
import useFetch from '../../hooks/useFetch';
import styles from './searchPage.module.css';

const SearchPage = () => {

  let presentYear = new Date().getFullYear();


  const {moviename} = useParams();
  //todo: By putting the filters here, it resets after each SearchPage load. move it to a global shared state?
  const [filters, setFilters] = useState([[], presentYear]);
  const [isFilterPageActive, setFilterPage] = useState(false);

  const API_KEY = process.env.REACT_APP_API_KEY;
  let api_call = `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&language=en-US&query=${moviename}&page=1&include_adult=false`
  const {data, loading, error} = useFetch(api_call);

  let returned = undefined;
  const navigate = useNavigate();
  let NoMovies = (
    <main className={styles.container}>
      <h2>We couldn't find a movie that fit in with the query "{moviename}"</h2>
      <h3>Try:</h3>
      <ul>
        <li>Going over your search input to make sure it is free of typos</li>
        <li>Removing or reducing the filters affecting the search results (if you have any enabled)</li>
      </ul>
      <Link to='/'>To Homepage</Link>
    </main>
  )
  if(error){
    navigate('/404');
  }if(data && filters){
    //* If the API doesn't return any movie from the search
    if(data.total_results === 0){
      returned = (NoMovies)
    }
    //* If at least one movie was returned from the API after search
    else{
      let final = data.results;
      //* Run checks for individual filters, then use the results in the movie grid
      if(filters[0].length > 0){
        final = final.filter(movie => {
          if(movie.genre_ids.length < 1) return true;
          for(let genre of filters[0]){
            if(movie.genre_ids.indexOf(genre) < 0) return false;
          }
          return true;
        })
      }if(filters[1] !== presentYear){
        final = final.filter((movie) => {
          if(!movie.release_date) return true;
          let movie_date = Number(movie.release_date.split('-')[0]);
          return movie_date <= filters[1];
        })
      }
      returned = final.length > 0 ? (<MoviesGrid movies={final} heading={`Search Results for "${moviename}"`}/>) : (NoMovies)
    }
  }

  return ( 
    <>
      <SearchMovie />
      {data && !loading &&
       <Filter filters={filters} setFilters={setFilters} isFilterPageActive={isFilterPageActive} setFilterPage={setFilterPage}/>
      }
      {loading && <LoadSpinner />}
      {data && !loading && !isFilterPageActive && returned}
    </>
  );
}
 
export default SearchPage;