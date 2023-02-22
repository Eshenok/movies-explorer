import React, { useState, useEffect, useMemo } from 'react';
import { Route, Switch, useHistory, useRouteMatch } from "react-router-dom";
import Header from './components/Header/Header';
import Footer from "./components/Footer/Footer";
import Main from "./components/Main/Main";
import Sign from "./components/Sign/Sign";
import Profile from "./components/Profile/Profile";
import NotFound from "./components/NotFound/NotFound";
import Movies from "./components/Movies/Movies";
import MenuPopup from "./components/Popups/MenuPopup/MenuPopup";
import MainApi from "./utils/MainApi";
import MoviesApi from "./utils/MoviesApi";
import { CurrentUserContext } from "./contexts/CurrentUserContext";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";
import Preloader from "./components/Preloader/Preloader";
import { shortsDuration, filmsQantityL, filmsQantityM, filmsQantityS, breakPointLowResolution, breakPointHighResolutioln } from "./constants";

function App() {
  /* eventlisteners */
  window.addEventListener("resize", () => {setScreenWidth(window.screen.width)});

    /* hooks */
  const [screenWidth, setScreenWidth] = useState(window.screen.width);
  const [currentUser, setCurrentUser] = useState({});
  const [savedMovies, setSavedMovies] = useState([]);
  const [allMovies, setAllMovies] = useState([]);
  const [failure, setFailure] = useState("");
  const [header, setHeader] = useState(true);
  const [footer, setFooter] = useState(true);
  const [isOpenMenuPopup, setIsOpenMenuPopup] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const [preload, setPreload] = useState(false);
  const history = useHistory();
  let {path, url} = useRouteMatch(); // По факту не используется, но только с ним работает приложение

  // eslint-disable-next-line no-restricted-globals
  const firstPath = useMemo(() => location.pathname, [])
  const defaultFilmsQuantity = useMemo(() => {
    return screenWidth < breakPointLowResolution ? filmsQantityS : screenWidth < breakPointHighResolutioln ? filmsQantityM : filmsQantityL;
    }, []);

  useEffect(() => {
    if (loggedIn) {
      setPreload(true);
      MainApi.getSavedMovies()
        .then((res) => {
          setSavedMovies(res);
          setFailure("");
        }).catch((err) => {setFailure("Не удалось получить сохраненные фильмы")})
        .finally(() => {setPreload(false)})
    }
  },[loggedIn])

  useEffect(() => {
    if (localStorage.getItem('movies')) {
      setAllMovies(JSON.parse(localStorage.getItem('movies')));
    } else if (loggedIn && !(localStorage.getItem('movies'))) {
      setPreload(true);
      MoviesApi.getMovies()
        .then((res) => {
          setAllMovies(res);
          localStorage.setItem('movies', JSON.stringify(res));
          setFailure("");
        }).catch((err) => {setFailure("Не удалось получить фильмы")})
        .finally(() => {setPreload(false)})
    }
  }, [loggedIn])

  useEffect(() => {
    if (!loggedIn) {
      setPreload(true);
      MainApi.getCurrentUser().then((res) => {
        setCurrentUser(res);
        setLoggedIn(true);
        history.push(firstPath);
        console.log(firstPath);
      }).catch((err) => {setFailure("")})
        .finally(() => {setPreload(false)})
    }
  }, [])

  useEffect(() => {
    /*Прослушка истории и при ее изменении проверяем необходимость footer и header*/
    history.listen(() => {
      closeAllPopups(); /*При переходе по ссылке будет закрывать все попапы*/
      setFailure("") /*Убирать ошибки от Api*/
      if (history.location.pathname === '/signin' || history.location.pathname === '/signup') {
        setHeader(false);
        setFooter(false);
      } else if (history.location.pathname === '/profile') {
        setHeader(true);
        setFooter(false);
      } else {
        setHeader(true);
        setFooter(true);
      }
    })
  }, [history.location.pathname])

  /*
   * Функции не отвечающие за работу Api
   */

  function blockScrollY () { /*При открытии модального окна блокируем прокрутку*/
    document.body.style.overflow = 'hidden';
    document.body.style.top = `-${window.scrollY}px`;
  }

  function unblockScrollY () {
    const scrollY = document.body.style.top;
    document.body.style.overflow = '';
    document.body.style.top = '';
    window.scrollTo(0, parseInt(scrollY || '0') * -1);
  }

  function handleOpenMenuPopup () {
    blockScrollY();
    setIsOpenMenuPopup(true)
  };

  function closeAllPopups() {
    unblockScrollY();
    setIsOpenMenuPopup(false);
  }

  /*
   * Функции работы с MainApi
   */

  function handleSignup(name, email, pass) {
    MainApi.createUser(name, email, pass).then((res) => {
      handleSignIn(email, pass);
      setFailure("");
    }).catch((err) => {setFailure(err.message ? err.message : "Что пошло не так...")});
  }

  function handleSignIn(email, pass) {
    MainApi.signIn(email, pass).then((res) => {
      setCurrentUser(res);
      setLoggedIn(true);
      history.push('/movies');
      setFailure("");
    }).catch((err) => {setFailure(err.message ? err.message : "Что пошло не так...")});
  }

  function handleUpdateUser(name, email) {
    setPreload(true);
    MainApi.updateUser(name, email)
      .then((res) => {
      setCurrentUser(res);
      setFailure("");
    }).catch((err) => {setFailure(err.message ? err.message : "Что пошло не так...")})
      .finally(() => {setPreload(false)});
  }

  function handleSignOut() {
    MainApi.signOut().then((res) => {
      setCurrentUser({});
      setLoggedIn(false);
      history.push('/');
      localStorage.removeItem('foundedMovies');
      sessionStorage.removeItem('savedFoundedMovies');
      localStorage.removeItem('movies');
    })
  }

  function handlePutLike(movie, thumbnail, image) {
    MainApi.putLike(movie, thumbnail, image).then((res) => {
      setSavedMovies([...savedMovies, res]);
    }).catch((err) => {console.log(err)});
  }

  function handleRemoveLike(id) {
    MainApi.removeSavedMovie(id)
      .then((res) => {
      setSavedMovies(savedMovies.filter((elem) => elem.movieId !== res.movieId ? elem : false));
      if (sessionStorage.getItem('savedFoundedMovies')) {
        const savedFoundedMovies = JSON.parse(sessionStorage.getItem('savedFoundedMovies'));
        savedFoundedMovies.movies = savedFoundedMovies.movies.filter((elem) => elem.movieId !== res.movieId ? elem : false)
        sessionStorage.setItem('savedFoundedMovies', JSON.stringify(savedFoundedMovies));
      }
    })
      .catch((err) => {setFailure("")})
  }

  function handleFoundMovies(moviesArr, query, isShorts) {
    return moviesArr.filter((movie) => {
      return movie.nameRU.toUpperCase().includes(query.toUpperCase()) && !isShorts ? movie
        : movie.nameRU.toUpperCase().includes(query.toUpperCase()) && isShorts && movie.duration <= shortsDuration
          ? movie : false
    })
  }

  function handleSearchMovie(moviesArr, query, isShorts, isSave) {
    setPreload(true);
    const foundMovies = handleFoundMovies(moviesArr, query, isShorts);
    if (isSave) {
      localStorage.setItem('foundedMovies', JSON.stringify({
        query: query,
        isShorts: isShorts,
        movies: foundMovies,
      }))
    } else {
      sessionStorage.setItem('savedFoundedMovies', JSON.stringify({
        query: query,
        isShorts: isShorts,
        movies: foundMovies,
      }))
    }
    setPreload(false);
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      {header ? <Header onMenuPopup={handleOpenMenuPopup} loggedIn={loggedIn} /> : <></>}
      <Switch>
        <ProtectedRoute
          path="/movies"
          component={Movies}
          history={history}
          onSearch={handleSearchMovie}
          savedMovies={savedMovies}
          defaultFilmsQuantity={defaultFilmsQuantity}
          onPutLike={handlePutLike}
          onRemoveLike={handleRemoveLike}
          loggedIn={loggedIn}
          screenWidth={screenWidth}
          allMovies={allMovies}
        />

        <ProtectedRoute
          path="/saved-movies"
          component={Movies}
          history={history}
          onSearch={handleSearchMovie}
          savedMovies={savedMovies}
          defaultFilmsQuantity={defaultFilmsQuantity}
          onRemoveLike={handleRemoveLike}
          loggedIn={loggedIn}
          screenWidth={screenWidth}
          allMovies={allMovies}
        />

        <ProtectedRoute
          path="/profile"
          component={Profile}
          onSubmit={handleUpdateUser}
          onExit={handleSignOut}
          loggedIn={loggedIn}
          failure={failure}
          history={history}
        />
        <Route exact path="/">
          <Main />
        </Route>

        <Route path="/signup">
          <Sign
            onSubmit={handleSignup}
            history={history}
            title={'Добро пожаловать!'}
            buttonTitle={'Зарегистрироваться'}
            failure={failure}
          />
        </Route>

        <Route exact path="/signin">
          <Sign
            onSubmit={handleSignIn}
            history={history}
            title={'Рады видеть!'}
            buttonTitle={'Войти'}
            failure={failure}
          />
        </Route>

        <Route path="*">
          <NotFound history={history}/>
        </Route>
      </Switch>
      {footer ? <Footer /> : <></>}
      <MenuPopup isOpen={isOpenMenuPopup} onClose={closeAllPopups} history={history} />
      {preload ? <Preloader /> : <></>}
    </CurrentUserContext.Provider>
  );
}

export default App;
