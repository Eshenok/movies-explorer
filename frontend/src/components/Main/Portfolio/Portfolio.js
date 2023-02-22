export default function Portfolio() {
  return (
    <section className="section portfolio">
      <h3 className="portfolio__title">Портфолио</h3>
      <ul className="portfolio__links">
        <li className="portfolio__link">
          <a className="portfolio__link_arrow" href="https://eshenok.github.io/how-to-learn/" rel="noreferrer" target="_blank">Статичный сайт</a>
        </li>

        <li className="portfolio__link">
          <a className="portfolio__link_arrow" href="https://eshenok.github.io/russian-travel/" rel="noreferrer" target="_blank">Адаптивный сайт</a>
        </li>

        <li className="portfolio__link">
          <a className="portfolio__link_arrow" href="https://voloshin.eshenok.nomoredomains.club" rel="noreferrer" target="_blank">Одностраничное приложение</a>
        </li>
      </ul>
    </section>
  )
}
