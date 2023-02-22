export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer__container">
        <p className="footer__text">Учебный проект Яндекс.Практикум х BeatFilm.</p>
        <ul className="footer__links">
          <li><a className="footer__link" href="https://practicum.yandex.ru" rel="noreferrer" target="_blank">Яндекс.Практикум</a></li>
          <li><a className="footer__link" href="https://github.com/Eshenok" rel="noreferrer" target="_blank">Github</a></li>
        </ul>
        <p className="footer__copyright">&copy;{new Date().getFullYear()}</p>
      </div>
    </footer>
  )
}
