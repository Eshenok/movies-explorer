import Film from "../Film/Film";
import Button from "../../Button/Button";
import { Route } from "react-router-dom";

export default function Films({ moviesArr, filmsQuantity, onMoreButton, onPutLike, onRemoveLike, savedMovies, history }) {
  return (
    <section className="films">
      <div className="films__container">
        {
          moviesArr.length === 0
            ? <h2 className="films__notFound">Ничего не найдено...</h2>
            : <>
              <Route path="/movies">
                {moviesArr.map((movie, index) =>
                  index < filmsQuantity && (
                    <Film
                      key={movie.id}
                      name={movie.nameRU}
                      url={movie.image.url}
                      duration={movie.duration}
                      currentMovie={movie}
                      onPutLike={onPutLike}
                      savedMovies={savedMovies}
                      onRemoveLike={onRemoveLike}
                      history={history}
                    />
                  ))}
              </Route>
              <Route path="/saved-movies">
                {moviesArr.map((movie, index) =>
                  index < filmsQuantity && (
                    <Film
                      key={movie.id}
                      name={movie.nameRU}
                      url={movie.image}
                      duration={movie.duration}
                      currentMovie={movie}
                      savedMovies={savedMovies}
                      onRemoveLike={onRemoveLike}
                      history={history}
                    />
                  ))}
              </Route>
            </>
        }
      </div>
      {
        moviesArr.length <= filmsQuantity
          ? <></>
          : <Button className="button button_place_films button_theme_grey" name={'Ещё'} onClick={onMoreButton} />
      }
    </section>
  )
}
