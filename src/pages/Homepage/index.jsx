import { useNavigate } from "react-router-dom";
import LoadSpinner from "../../components/LoadSpinner";
import MoviesGrid from "../../components/MoviesGrid";
import SearchMovie from "../../components/SearchMovie";
import useFetch from "../../hooks/useFetch";

const HomePage = () => {

  const navigate = useNavigate();
  const API_KEY = process.env.REACT_APP_API_KEY;
  let api_call = `https://api.themoviedb.org/3/trending/movie/day?api_key=${API_KEY}`;
  let {data, loading, error} = useFetch(api_call);

  let top_ten = [];
  if(data){
    top_ten = data.results.slice(0, 10);
  }if(error){
    navigate('/404');
  }
  

  return (
    <>
      <SearchMovie />
      { loading && <LoadSpinner />}
      { data && <MoviesGrid movies={top_ten} heading='Trending Movies Today'/>}
    </>
  );
}
 
export default HomePage;