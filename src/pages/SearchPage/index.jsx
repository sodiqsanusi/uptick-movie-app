import { useState } from 'react';
import {useNavigate, useParams} from 'react-router-dom';
import Filter from '../../components/Filter';
import LoadSpinner from '../../components/LoadSpinner';
import MoviesGrid from '../../components/MoviesGrid';
import SearchMovie from '../../components/SearchMovie';
import useFetch from '../../hooks/useFetch';
import styles from './searchPage.module.css';

const SearchPage = () => {

  let presentYear = new Date().getFullYear();


  const {moviename} = useParams();
  const [filters, setFilters] = useState([[], presentYear]);
  // const [returned, setReturned] = useState(undefined);

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
        console.log('True 1', filters[0])
      }if(filters[1] !== presentYear){
        console.log('normal', final)
        console.log(filters[1])
        final = final.filter((movie) => {
          if(!movie.release_date) return true
          let movie_date = Number(movie.release_date.split('-')[0]);
          return movie_date <= filters[1];
        })
        console.log('filtered' ,final)
      }
      returned = final.length > 0 ? (<MoviesGrid movies={final} heading={`Search Results for "${moviename}"`}/>) : (NoMovies)
    }
  }

  return ( 
    <>
      <SearchMovie />
      {data && !loading && <Filter filters={filters} setFilters={setFilters}/>}
      {loading && <LoadSpinner />}
      {data && !loading && returned}
    </>
  );
}
 
export default SearchPage;