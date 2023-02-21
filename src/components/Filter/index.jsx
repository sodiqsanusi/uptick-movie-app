import styles from './filter.module.css';
import {GoSettings} from 'react-icons/go';
import { useState } from 'react';
import FilterPage from './FilterPage';

const Filter = ({filters, setFilters}) => {

  let [isFilterPageActive, setFilterPage] = useState(false);
  let presentYear = new Date().getFullYear();

  let handleClick = () => {
    setFilterPage(true);
  }

  return ( 
    <section className={styles.container}>
      <p>{filters[0].length === 0 && filters[1] === presentYear ? 'No filter enabled' : 'Filters are being used'}</p>
      <button className={styles.filterBtn} onClick={handleClick} aria-label='Click to open the filter panel'>
        <GoSettings />
      </button>
      {isFilterPageActive && <FilterPage setFilterPanel={setFilterPage} filters={filters} setFilters={setFilters}/>}
    </section>
  );
}
 
export default Filter;