import styles from './filter.module.css';
import {GoSettings} from 'react-icons/go';

const Filter = () => {
  return ( 
    <section className={styles.container}>
      <p>No filter enabled</p>
      <button className={styles.filterBtn}>
        <GoSettings />
      </button>
    </section>
  );
}
 
export default Filter;