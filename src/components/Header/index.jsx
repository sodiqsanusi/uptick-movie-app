import styles from './header.module.css';
import TMDBAttributionImg from '../../images/tmdb_logo.svg';
import { Link } from 'react-router-dom';

const Header = () => {
  return ( 
    <header className={styles.container}>
      <div className={styles.wrapper}>
        <Link to='/'>Uptick Movies</Link>
        <div className={styles.imgContainer}><img src={TMDBAttributionImg} alt='This web application is powered by The Movie DB'/></div>
      </div>
    </header>
  );
}
 
export default Header;