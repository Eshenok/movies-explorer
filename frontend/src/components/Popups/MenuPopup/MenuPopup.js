import { Link } from "react-router-dom";
import AccountLink from "../../AccountLink/AccountLink";
import Button from "../../Button/Button";

export default function MenuPopup({ isOpen, onClose, history }) {

  const menuPopupClasses = ['menu-popup'];

  if (isOpen) {
    menuPopupClasses.push('menu-popup_opened');
  }

  return (
    <div className={menuPopupClasses.join(' ')}>
      <ul className="menu-popup__links">
        <li><Link className="menu-popup__link" to="/">Главная</Link></li>
        <li><Link className={
          history.location.pathname === "/movies"
          ? "menu-popup__link menu-popup__link_current-page"
          : "menu-popup__link"
        }
              to="/movies">Фильмы</Link></li>
        <li><Link className={
          history.location.pathname === "/saved-movies"
            ? "menu-popup__link menu-popup__link_current-page"
            : "menu-popup__link"
        }  to="/saved-movies">Сохранённые фильмы</Link></li>
      </ul>
      <AccountLink />
      <Button className="button button_icon_close button_place_menu-popup" onClick={onClose}/>
    </div>
  )
}
