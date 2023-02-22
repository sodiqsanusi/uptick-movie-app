import { useNavigate, useParams } from "react-router-dom";
import LoadSpinner from "../../components/LoadSpinner";
import useFetch from "../../hooks/useFetch";
import styles from './movie.module.css';
import noImage from '../../images/no_image.jpg'
import { GoChevronLeft } from "react-icons/go";


const Movie = () => {

  const navigate = useNavigate();
  const {movie} = useParams()
  const {data, loading, error} = useFetch(`https://api.themoviedb.org/3/movie/${movie}?api_key=a292bc849e626064fe771d6c1c1ae60f&language=en-US`);

  let rating = 0;
  let genreNames = '-'
  if(data){
    rating = data.vote_average ? data.vote_average.toFixed(1) : '-';
    //* Mapping through the genres of the movie so I can get a string to display
    genreNames = data.genres[0] ? data.genres.map(genre => genre.name).join(', ') : '-';
  }
  if(error){
    navigate('/404');
  }

  let handleClick = () => {
    navigate(-1);
  }

  return (
    <main className={styles.container}>
      <button className={styles.previousBtn} onClick={handleClick}>
        <GoChevronLeft />
        <p>Previous Page</p>
      </button>
      {loading && <LoadSpinner />}
      {data && (
        <article className={styles.articleContainer}>
          <div aria-hidden='true' role='presentation' className={styles.moviePoster}>
            <img src={data.poster_path ? `https://image.tmdb.org/t/p/w1280${data.poster_path}`: noImage} alt="" />
          </div>
          <section className={styles.movieArticle}>
            <div>
              <div className={styles.movieArticle1}>
                <h2>{data.title || ''}</h2>
                <p>{data.tagline || ''}</p>
              </div>
              <div className={styles.movieArticle2}>
                <p>Genre: <span>{genreNames}</span></p>
                <p>Rating: <span>{rating}</span></p>
                <p>Release Date: <span>{data.release_date || '-'}</span></p>
              </div>
            </div>
            <div className={styles.movieArticle3}>
              <h3>Plot</h3>
              <p>{data.overview || '-'}</p>
            </div>
          </section>
        </article>
      )}
    </main>
   );
}
 
export default Movie;