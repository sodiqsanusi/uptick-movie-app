import { useState } from "react";
import styles from "./searchMovie.module.css";
import { useNavigate } from "react-router-dom";

const SearchMovie = () => {

  const navigate = useNavigate();

  let [searchValue, setSearchValue] = useState('');
  let handleSubmit = (e) => {
    e.preventDefault();
    if(!/\w/.test(searchValue)) return;
      
    navigate(`/search/${searchValue}`)
  }

  return (
    <form onSubmit={(e) => handleSubmit(e)} className={styles.container}>
      <input
       type="search" value={searchValue} placeholder="Search for a movie"
       autoComplete="off" onChange={(e) => setSearchValue(e.target.value)} className={styles.movieInput}
      />
    </form>
  );
}
 
export default SearchMovie;