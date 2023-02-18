import { Link } from 'react-router-dom';
import styles from './moviesGrid.module.css';


const MoviesGrid = ({movies}) => {

  let genres = {
    28: 'Action',
    12: 'Adventure',
    16: 'Animation',
    35: 'Comedy',
    80: 'Crime',
    99: 'Documentary',
    18: 'Drama',
    10751: 'Family',
    14: 'Fantasy',
    36: 'History',
    27: 'Horror',
    10402: 'Music',
    9648: 'Mystery',
    10749: 'Romance',
    878: 'Science Fiction',
    10770: 'TV Movie',
    53: 'Thriller',
    10752: 'War',
    37: 'Western'
  }

  return ( 
    <main className={styles.container}>
      <h1 className={styles.heading}>Trending Movies Today</h1>
      <ul>
        {movies.map((movie, index) => (
          <li key={index} className={styles.card}>
            <div aria-hidden='true' role='presentation' className={styles.imgContainer}>
              <img src={`https://image.tmdb.org/t/p/w1280${movie.poster_path}`} alt=''/>
            </div>
            <Link to={`/movie/${movie.id}`} className={styles.cardLink}>
              <h2>{movie.title}</h2>
              <div>
                <p>{movie.release_date}</p>
                <p>{genres[movie.genre_ids[0]]}</p>
              </div>
            </Link>  
          </li>
        ))}
      </ul>
    </main>
  );
}
 
export default MoviesGrid;