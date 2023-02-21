import styles from './filter.module.css';
import {GoSettings} from 'react-icons/go';
import { useState } from 'react';
import FilterPage from './FilterPage';

const Filter = () => {

  let [isFilterPageActive, setFilterPage] = useState(false);

  let handleClick = () => {
    setFilterPage(true);
  }

  return ( 
    <section className={styles.container}>
      <p>No filter enabled</p>
      <button className={styles.filterBtn} onClick={handleClick} aria-label='Click to open the filter panel'>
        <GoSettings />
      </button>
      {isFilterPageActive && <FilterPage setFilterPanel={setFilterPage}/>}
    </section>
  );
}
 
export default Filter;