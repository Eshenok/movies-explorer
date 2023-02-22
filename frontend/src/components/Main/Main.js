import Hero from "./Hero/Hero";
import NavTab from "./NavTab/NavTab";
import Promo from "./Promo/Promo";
import Tech from "./Tech/Tech";
import Student from "./Student/Student";
import Portfolio from "./Portfolio/Portfolio";
import React from "react";

export default function Main() {
  return (
    <main className="main">
      <Hero />
      <NavTab />
      <Promo />
      <Tech />
      <Student />
      <Portfolio />
    </main>
  )
}
