import { useState } from 'react';
import {useNavigate, useParams} from 'react-router-dom';
import LoadSpinner from '../../components/LoadSpinner';
import MoviesGrid from '../../components/MoviesGrid';
import SearchMovie from '../../components/SearchMovie';
import useFetch from '../../hooks/useFetch';
import styles from './searchPage.module.css';

const SearchPage = () => {


  const {moviename} = useParams();
  const [results, setResults] = useState([]);
  // const [returned, setReturned] = useState(undefined);

  const API_KEY = process.env.REACT_APP_API_KEY;
  let api_call = `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&language=en-US&query=${moviename}&page=1&include_adult=false`
  const {data, loading, error} = useFetch(api_call);

  let returned = undefined;
  const navigate = useNavigate();
  let NoMovies = (
    <main className={styles.container}>
      <h2>We couldn't find a movie that fit in with your queries</h2>
      <h3>Try:</h3>
      <ul>
        <li>Going over your search input to make sure it is free of typos</li>
        <li>Removing or reducing the filters affecting the search results (if you have any enabled)</li>
      </ul>
    </main>
  )
  if(error){
    navigate('/404');
  }if(data){
    if(data.total_results === 0){
      returned = (NoMovies)
    }else{
      returned = (<MoviesGrid movies={data.results} heading={`Search Results for "${moviename}"`}/>)
    }
  }

  return ( 
    <>
      <SearchMovie />
      {loading && <LoadSpinner />}
      {data && !loading && returned}
    </>
  );
}
 
export default SearchPage;