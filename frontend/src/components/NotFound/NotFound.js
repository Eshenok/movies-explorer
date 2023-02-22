import Button from "../Button/Button";
import { useCallback } from "react";

export default function NotFound({ history }) {

  const handleClick = useCallback(() => {
    history.goBack();
    history.goBack();
  }, [])

  return (
    <section className="notFound">
      <div className="notFound__container">
        <h2 className="notFound__title">404</h2>
        <p className="notFound__text">Страница не найдена</p>
      </div>
      <Button name={"Назад"} className="button button_theme_transparent-blue" onClick={handleClick} />
    </section>
  )
}
