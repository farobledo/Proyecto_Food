import React from "react";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getRecipe } from "../Redux/Actions";
import Load from "./Load";
import "../css/RecipeDetails.css";

export default function RecipeDetails() {
  const dispatch = useDispatch();
  const { id } = useParams();

  const recipe = useSelector((state) => state.recipe);
  const [load, setLoad] = useState(true);
  //pagina de carga

  useEffect(() => {
    async function a() {
      setLoad(true);
      const b = await dispatch(getRecipe(id));
      setLoad(false);
      console.log("useEffect details", recipe);
    }
    a();
  }, [dispatch, id]);

  return (
    <div className="BackGraundDetails">
      {load ? (
        <Load />
      ) : (
        <div key="content" className="con">
          <img
            src={recipe?.image}
            key="imgfood"
            className="imgRecipe"
            alt="Img Not Found"
          />
          <div key="ab" className="contained_info">
            <div className="info">
              <h2>Nombre:{recipe.title ? recipe.title : "cargando titulo"}</h2>
              <h3>{recipe.summary ? recipe.summary : null}</h3>
              <h4>{recipe.instructions ? recipe.instructions : null}</h4>
              {recipe.diets?.map((dieta) => (
                <button key={dieta.name} className="dieta">
                  {dieta.name}
                </button>
              ))}
              <p>Puntuacion: {recipe?.spoonacularScore}%</p>
              <p>Nivel de salud:{recipe?.healthScore}%</p>
              <Link to="/home">
                <button className="buttonDetails">Regresar!</button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
