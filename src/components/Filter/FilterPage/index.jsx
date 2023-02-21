import { GoX } from 'react-icons/go';
import styles from './filterPage.module.css';
import { genres } from '../../MoviesGrid';

const FilterPage = ({setFilterPanel}) => {


  let handleClose = () => {
    setFilterPanel(false);
  }
  let handleClear = () => {
    console.log('All cleared')
  }
  let handleApply = () => {
    console.log('Filter preferences applied')
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
          <h3>Genre</h3>
          <ul>
            {Object.keys(genres).map( key => (
              <li key={key} className={styles.genreItem}>
                <label htmlFor={key}>{genres[key]}</label>
                <input type="checkbox" id={key}/>
              </li>
            ))}
          </ul>
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