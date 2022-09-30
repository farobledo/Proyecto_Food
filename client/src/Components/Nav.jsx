import React from "react";
import { Link, Outlet } from "react-router-dom";
import LogoFood from "../img/food.jpg";
import "../css/Nav.css";

export default function Nav() {
  return (
    <>
      <nav className="BackGraund_Nav">
        <ul className="ul_nav">
          <li className="logoFood">
            <img width={30} src={LogoFood} alt="food" />
          </li>
          <li className="li_nav">
            <Link className="link" to="/">
              landing page
            </Link>
            <Link className="link" to="/home">
              Home
            </Link>
            <Link className="link" to="/create">
              Crear Receta
            </Link>
          </li>
        </ul>
      </nav>
      <Outlet />
    </>
  );
}
