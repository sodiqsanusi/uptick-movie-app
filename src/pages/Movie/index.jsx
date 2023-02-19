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
    <main>
      <button
        className={styles.previousBtn}
        onClick={handleClick}
      >Back to previous page</button>
      {loading && <LoadSpinner />}
      {data && (
        <article>
          <div aria-hidden='true' role='presentation'><img src={`https://image.tmdb.org/t/p/w1280${data.poster_path}`} alt="" /></div>
          <section>
            <h2>{data.title || ''}</h2>
            <i>{data.tagline || ''}</i>
            <p>Genre: <span>{genres[data.genres[0].id]}</span></p>
            <p>Rating: <span>{rating}</span></p>
            <p>Release Date: <span>{data.release_date}</span></p>
            
            <br/>
            <p>{data.overview}</p>
          </section>
        </article>
      )}
      Particular movie: {movie}
    </main>
   );
}
 
export default Movie;