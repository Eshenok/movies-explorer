export default function Promo() {
  return (
    <section className="section promo">
      <h2 className="section__title section__title_border_white promo__title"><a name="promo">О проекте</a></h2>
      <div className="promo__container">
        <article className="promo__brief">
          <h3 className="promo__subtitle">Дипломный проект включал 5 этапов</h3>
          <p className="section__text promo__text">Составление плана, работу над бэкендом, вёрстку, добавление функциональности и финальные доработки.</p>
        </article>
        <article className="promo__brief">
          <h3 className="promo__subtitle">На выполнение диплома ушло 5 недель</h3>
          <p className="section__text promo__text">У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было соблюдать, чтобы успешно защититься.</p>
        </article>
      </div>
      <div className="promo__time">
        <p className="promo__block promo__block_theme_green">1 неделя</p>
        <p className="promo__block promo__block_theme_grey">4 недели</p>
        <p className="promo__block_caption">Back-end</p>
        <p className="promo__block_caption">Front-end</p>
      </div>
    </section>
  )
}
