import {useParams} from 'react-router-dom';

const SearchPage = () => {


  const {moviename} = useParams();

  return ( 
    <>
      SearchPage {moviename}
    </>
  );
}
 
export default SearchPage;