import React from "react";
import { Link } from "react-router-dom";
import "../css/Leading.css";

export default function Leading() {
  return (
    <div className="Leading_background">
      <div className="conteined">
        <div></div>
        <div>
          <h1 className="title">Food Bienvenidos</h1>
          <Link to={"/home"}>
            <button className="buttonleading">Entrar!</button>
          </Link>
        </div>
        <div className="discurcito">
          <p>
            {" "}
            <br />
            Aquí encontrarás la mejor
            <br /> recetas, con los mejores
            <br /> ingredientes, para tu comida
            <br /> favorita.
            <br /> Aventurarte en un mundo lleno de <br />
            sabores
          </p>
        </div>
      </div>
    </div>
  );
}
