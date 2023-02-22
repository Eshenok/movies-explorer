import personalPhoto from "../../../images/personalphoto.jpg";

export default function Student() {
  return (
    <section className="section student">
      <h2 className="section__title section__title_border_white student__title"><a name="student">Студент</a></h2>
      <img className="student__image" src={personalPhoto} alt="Портрет. Александр Волошин"/>
      <div className="student__container">
        <h3 className="student__name">Александр</h3>
        <p className="section__text student__about">Фронтенд-разработчик, 23 года</p>
        <p className="section__text student__text">Я родился и вырос в Москве, закончил Политехнический колледж по специальности "Прикладная информатика".
          Мое хобби: Гитара, 10+ лет, играю в стиле fingerstyle. Ранее работал в Интернет-провайдере и сети кинотеатров.
          В 2021 году решил сменить профессию и начал учиться на курсах Яндекс.Практикум.</p>
      </div>
      <a className="student__ghlink" href="https://github.com/Eshenok" target="_blank">Github</a>
    </section>
  )
}
