import { useNavigate, useParams } from "react-router-dom";
import LoadSpinner from "../../components/LoadSpinner";
import useFetch from "../../hooks/useFetch";
import styles from './movie.module.css';
import { genres } from "../../components/MoviesGrid";


const Movie = () => {

  const navigate = useNavigate();
  const {movie} = useParams()
  const {data, loading, error} = useFetch(`https://api.themoviedb.org/3/movie/${movie}?api_key=a292bc849e626064fe771d6c1c1ae60f&language=en-US`);

  let rating = 0;
  if(data){
    console.log(data);
    rating = data.vote_average.toFixed(1);
  }
  if(error){
    navigate('/404');
  }

  let handleClick = () => {
    navigate(-1);
  }

  return (
    <main className={styles.container}>
      <button
        className={styles.previousBtn}
        onClick={handleClick}
      >Back to previous page</button>
      {loading && <LoadSpinner />}
      {data && (
        <article className={styles.articleContainer}>
          <div aria-hidden='true' role='presentation' className={styles.moviePoster}><img src={`https://image.tmdb.org/t/p/w1280${data.poster_path}`} alt="" /></div>
          <section className={styles.movieArticle}>
            <div>
              <div className={styles.movieArticle1}>
                <h2>{data.title || ''}</h2>
                <p>{data.tagline || ''}</p>
              </div>
              <div className={styles.movieArticle2}>
                <p>Genre: <span>{genres[data.genres[0].id]}</span></p>
                <p>Rating: <span>{rating}</span></p>
                <p>Release Date: <span>{data.release_date}</span></p>
              </div>
            </div>
            <div className={styles.movieArticle3}>
              <h3>Plot</h3>
              <p>{data.overview}</p>
            </div>
          </section>
        </article>
      )}
    </main>
   );
}
 
export default Movie;