import { Route, Routes } from "react-router-dom";
import HomePage from './pages/Homepage';
import SearchPage from './pages/SearchPage';
import Page404 from "./pages/Page404";
import Header from "./components/Header";
import Movie from "./pages/Movie";

function App() {

  return (
    <>
    <Header />
    <Routes>
      <Route path='/' element={<HomePage />} />
      <Route path='/search/:moviename' element={<SearchPage />} />
      <Route path='/movie/:movie' element={<Movie />} />
      <Route path='*' element={<Page404 />} />
    </Routes>
    </>
    
  );
}

export default App;
