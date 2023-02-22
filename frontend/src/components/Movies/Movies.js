import Search from "./Search/Search";
import Films from "./Films/Films";
import { useEffect, useMemo, useState } from "react";
import { stepQuantityS, stepQuantityM, breakPointHighResolutioln } from "../../constants";

export default function Movies({ history, onSearch, savedMovies, defaultFilmsQuantity, onPutLike, onRemoveLike, screenWidth, allMovies }) {

  const [filmsQuantity, setFilmsQuantity] = useState(defaultFilmsQuantity);
  const [isSearch, setIsSearch] = useState(0);

  const savedFoundedMovies = JSON.parse(sessionStorage.getItem('savedFoundedMovies'));
  const foundedMovies = JSON.parse(localStorage.getItem('foundedMovies'));
  const step = screenWidth > breakPointHighResolutioln ? stepQuantityM : stepQuantityS;

  /*Предзагрузка если есть найденные фильмы в LS*/
  useEffect(() => {
    if (foundedMovies && history.location.pathname === '/movies') {
      setIsSearch(isSearch+1);
    } else if (savedFoundedMovies && history.location.pathname === '/saved-movies') {
      setIsSearch(isSearch+1);
    } else {
      setIsSearch(0);
    }
  }, [history.location.pathname])

  /*При изм разрешения добивать ряд до конца*/
  useEffect(() => {
    setFilmsQuantity(filmsQuantity + (filmsQuantity%step === 0 ? 0 : (filmsQuantity+1)%step === 0 ? 1 : (filmsQuantity+2)%step === 0 ? 2 : 0));
  }, [screenWidth])

  const moviesArr = useMemo(() => {
    return isSearch && history.location.pathname === '/movies' && foundedMovies
      ? foundedMovies.movies : history.location.pathname === '/movies'
        ? allMovies : savedFoundedMovies
          ? savedFoundedMovies.movies : savedMovies;
  }, [isSearch, history.location.pathname, allMovies, savedMovies])

  function handleMoreButton() {setFilmsQuantity(filmsQuantity + step)}

  function showFoundMovies(moviesArr, query, isShorts, isSave) {
    setIsSearch(isSearch+1);
    setFilmsQuantity(defaultFilmsQuantity);
    onSearch(moviesArr, query, isShorts, isSave);
  }

  /*Функция очистки поиска, при разных роутах убираем разные Item'ы*/
  function clearSearch() {
    if (history.location.pathname === '/movies') {
      localStorage.removeItem('foundedMovies');
    } else {
      sessionStorage.removeItem('savedFoundedMovies');
    }
    setIsSearch(0);
  }

  return (
    <main className="movies">
      <Search allMovies={allMovies} foundedMovies={foundedMovies} savedFoundedMovies={savedFoundedMovies} savedMovies={savedMovies} isSearch={isSearch} onSearch={showFoundMovies} onClear={clearSearch} history={history}/>
      <Films
        savedMovies={savedMovies}
        moviesArr={moviesArr ? moviesArr : []}
        filmsQuantity={filmsQuantity}
        onMoreButton={handleMoreButton}
        onPutLike={onPutLike}
        onRemoveLike={onRemoveLike}
        history={history}
      />
    </main>
  )
}
