import Button from "../../Button/Button";
import { Input } from "../../Input/Input";
import { useEffect, useState } from "react";

export default function Search({ onSearch, onClear, allMovies, savedMovies, history, foundedMovies, savedFoundedMovies }) {

  const [searchQuery, setSearchQuery] = useState('');
  const [isShorts, setIsShorts] = useState(false);

  /*
  * Проверка на сохраненные фильмы
  */
  useEffect(() => {
    if (foundedMovies && history.location.pathname === '/movies') {
      /*При загрузке страницы если есть найденные фильмы подставляем запрос*/
      setSearchQuery(foundedMovies.query);
      setIsShorts(foundedMovies.isShorts);
    } else if (savedFoundedMovies && history.location.pathname === '/saved-movies') {
      /*Храним только в текущей сессии, если есть найденные сохраненные фильмы*/
      setSearchQuery(savedFoundedMovies.query);
      setIsShorts(savedFoundedMovies.isShorts);
    } else {
      setSearchQuery('');
      setIsShorts(false);
    }
  }, [history.location.pathname])

  function handleSearch(e) {
    e.preventDefault();
    search(isShorts);
  }

  function handleChangeShorts (e) {
    setIsShorts(!isShorts);
    search(!isShorts);
  }

  function search(isShorts) {
    if (searchQuery === "" && !isShorts) {
      onClear();
    } else if (history.location.pathname === '/movies') {
      /*Если запрос на Movies*/
      onSearch(allMovies, searchQuery, isShorts, true);
    } else {
      /*Если запрос на Saved-movies*/
      onSearch(savedMovies, searchQuery, isShorts, false);
    }
  }

  return (
    <section className="search">
      <form className="search__form" onSubmit={handleSearch}>
        <fieldset className="search__input-container">
          <Input
            className="input input_type_search"
            placeholder="Фильм"
            value={searchQuery}
            onChange={(e) => {setSearchQuery(e.target.value)}}
          />
          <Button className={"button button_icon_search"} />
        </fieldset>

        <div className="search__toggle">
          <input
            type="checkbox"
            className="input input_type_shorts input_view_hidden search__toggle_checkbox"
            id="input_type_shorts"
            checked={isShorts}
            value={isShorts}
            onChange={handleChangeShorts}
          />
          <label htmlFor="input_type_shorts" className="search__fake-toggle"></label>
          <span className="search__toggle_text">Короткометражки</span>
        </div>
      </form>
    </section>
  )
}
