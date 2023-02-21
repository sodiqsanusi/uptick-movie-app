import { GoX } from 'react-icons/go';
import styles from './filterPage.module.css';
import { genres } from '../../MoviesGrid';
import { useState } from 'react';

const FilterPage = ({setFilterPanel, filters, setFilters}) => {

  let presentYear = new Date().getFullYear();

  let [year, setYear] = useState(filters[1]);
  let [genre, setGenres] = useState(filters[0])

  let handleClose = () => {
    setFilterPanel(false);
  }
  let handleClear = () => {
    setFilters([[], presentYear]);
    setYear(presentYear);
    setGenres([]);
  }
  let handleApply = () => {
    console.log('Filter preferences applied')
    setFilters([genre, Number(year)])
    setFilterPanel(false);
  }
  let handleAdding = (id) => {
    let lilac = [...genre];
    if(genre.indexOf(id) < 0){
      lilac.push(id)
    }else{
      let position = genre.indexOf(id);
      lilac.splice(position, 1);
    }
    setGenres(lilac);
  }

  return ( 
    <aside className={styles.container}>
      <div className={styles.header}>
        <button className={styles.closeFilterBtn} aria-label='Click to close the filter panel' onClick={handleClose}>
          <GoX />
        </button>
        <h2>Filter results</h2>
        <button className={styles.clearFilterBtn} aria-label='Click to remove all enabled filters' onClick={handleClear}>
          Clear All
        </button>
      </div>
      <form className={styles.filterForm}>
        <div className={styles.genreFilter}>
          <h3>Genre:</h3>
          <ul className={styles.genreList}>
            {Object.keys(genres).map( key => (
              <li key={key} className={styles.genreItem}>
                <label htmlFor={key}>{genres[key]}</label>
                <input 
                  type="checkbox" id={key}
                  checked={genre.indexOf(Number(key)) >= 0}
                  onChange={() => handleAdding(Number(key))}
                />
              </li>
            ))}
          </ul>
        </div>
        <div className={styles.dateFilter}>
          <h3>Release Date:</h3>
          <p>Search results will be filtered to movies released before (or on) the year {year}</p>
          <div className={styles.rangeContainer}>
            <input
              type="range" id="release_date" max={`${presentYear}`} min='1892'
              value={year} onChange={(e) => setYear(e.target.value)}
            />
            <label htmlFor="release_date">Slide to change date</label>
          </div>
        </div>
      </form>
      <div className={styles.ending}>
        <button className={styles.resultsBtn} aria-label='Click to get search results that has been filtered using your preferences' onClick={handleApply}>
         Show results
        </button>
      </div>    
    </aside>
  );
}
 
export default FilterPage;