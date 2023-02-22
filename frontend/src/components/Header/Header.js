import logo from "../../images/logo.svg";
import Button from "../Button/Button";
import { Link } from "react-router-dom";
import AccountLink from "../AccountLink/AccountLink";

export default function Header({ onMenuPopup, loggedIn }) {

  return (
    <header className="header">
      <div className="header__container">
        <Link to="/"><img className="logo header__logo" alt="logo" src={logo} /></Link>
        {
          loggedIn
            ?
            <><div className="header__menu">
              <div className="header__menu_links">
                <Link className="header__menu_link" to="/movies">Фильмы</Link>
                <Link className="header__menu_link" to="/saved-movies">Сохранённые фильмы</Link>
              </div>
              <AccountLink />
            </div>
              <Button className="button button_icon_burger" onClick={onMenuPopup} /> </>
            :
            <nav className="header__navigation">
              <Link className="header__link" to="/signup">Регистрация</Link>
              <Link className="header__link header__link_theme_green" to="/signin">Войти</Link>
            </nav>
        }
      </div>
    </header>
  )
}
