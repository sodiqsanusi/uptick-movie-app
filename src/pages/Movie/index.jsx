import { useParams } from "react-router-dom";


const Movie = () => {

  const {movie} = useParams()

  return ( 
    <>
      Particular movie: {movie}
    </>
   );
}
 
export default Movie;