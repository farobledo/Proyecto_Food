import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { postNewRecipe, getDiets } from "../Redux/Actions";
import "../css/Create.css";

function valid(data) {
    let err = {};
    if (!data.title) err.title = "Falta el Titulo";
    else if (!data.summary) err.summary = "Falta el Resumen";
    else if (!data.instructions) err.summary = "Faltan la Necesidades";
    return err
}


export default function CreateRecipe() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const diets = useSelector((state) => state.allDiets);

    const [err, setErr] = useState({});
    const [newRecipe, setNewRecipe] = useState({
        title: "",
        summary: "",
        spoonacularScore: 50,
        healthScore: 50,
        instructions: "",
        image: "",
        diets: []
    });

    const Change = (data) => {
        setNewRecipe({
            ...newRecipe,
            [data.target.name]: data.target.value
        });
        setErr(valid({
            ...newRecipe,
            [data.target.name]: data.target.value
        }));
    };

    const select = (data) => {


        setNewRecipe({
            ...newRecipe,
            diets: [...newRecipe.diets, data.target.value]
        });
        console.log(newRecipe.diets)
    };

    const deleteDiet = (delet) => {
        setNewRecipe({
            ...newRecipe,
            diets: newRecipe.diets.filter(diet => diet !== delet)
        });
    };


    const Submit = (data) => {
        if (!newRecipe.title && !newRecipe.summary) {
            data.preventDefault()
            return alert("La receta necesita un título y un resumen.")
        } else if (!newRecipe.diets.length) {
            data.preventDefault()
            return alert("Necesitas agregar al menos una dieta para la receta")
        } else {
            if (!newRecipe.image) {
                newRecipe.image = "https://previews.123rf.com/images/karandaev/karandaev1403/karandaev140300061/26325584-los-platos-vac%C3%ADos-en-la-mesa-de-madera.jpg"
            }
            dispatch(postNewRecipe(newRecipe))
            console.log(newRecipe)
            alert("Receta creada con éxito!")
            console.log(newRecipe)
            setNewRecipe({
                title: "",
                summary: "",
                spoonacularScore: 50,
                healthScore: 50,
                instructions: "",
                image: "",
                diets: []
            })
            navigate("/home")
        };
    };

    useEffect(() => {

        dispatch(getDiets())
    }, [dispatch]);
    return (
        <div className="BackGraund_Create">
            <div className="Contained_Create">

                <h1>CREA TU RECETA PERSONALIZADA</h1>
                <form action="submit">
                    <div className="DataCreate">
                        <label className="minTitulo">Titulo</label>
                        <input className="DataInput" type="text" value={newRecipe.title} name="title" onChange={(p) => Change(p)} ></input>
                        {err.title && (<p className="error"> {err.title} </p>)}
                    </div>
                    <div className="DataCreate">
                        <label className="minTitulo">Resumen</label>
                        <input className="DataInput" type="text" value={newRecipe.summary} name="summary" onChange={(p) => Change(p)} ></input>
                        {err.summary && (<p className="error"> {err.summary} </p>)}
                    </div>
                    <div className="DataCreate">
                        <label className="minTitulo">Puntaje</label>
                        <input className="DataInput" type="range" min="0" max="100" value={newRecipe.spoonacularScore} name="spoonacularScore" onChange={(p) => Change(p)} ></input>
                        {<p>{newRecipe.spoonacularScore}</p>}
                    </div>
                    <div className="DataCreate">
                        <label className="minTitulo">Puntuación de salud</label>
                        <input className="DataInput" type="range" min="0" max="100" value={newRecipe.healthScore} name="healthScore" onChange={(p) => Change(p)} ></input>
                        {<p>{newRecipe.healthScore}</p>}
                    </div>
                    <div className="DataCreate">
                        <label className="minTitulo">Instrucciones</label>
                        <input className="DataInput" type="text" value={newRecipe.instructions} name="instructions" onChange={(p) => Change(p)} ></input>
                        {err.instructions && (<p className="error"> {err.instructions} </p>)}
                    </div>
                    <div className="DataCreate">
                        <label className="minTitulo">URL Imagen</label>
                        <input className="DataInput" type="url" value={newRecipe.image} name="image" onChange={(p) => Change(p)} ></input>

                    </div>
                    <div className="selectdiets">
                        <div>
                            <label className="minTitulo">Dietas</label>
                            <select onChange={(e) => select(e)}>
                                <option value="" hidden name="diets" >Selecionar Dietas</option>
                                {diets?.map(diet => {
                                    return (<option value={diet.id} key={diet.id}>{diet.name}</option>)
                                })
                                }
                            </select>
                        </div>
                        <div className="ul_home">
                            {newRecipe.diets.map(diet =>
                                <div className="dietaa" >
                                    <p>{diets?.find(element => element.id === diet)?.name}</p>
                                    <button className="close" onClick={() => deleteDiet(diet)}>x</button>
                                </div>
                            )}
                        </div>
                    </div>
                    <button className="rainbow-button" type="submit" onClick={(p) => Submit(p)}>Crear</button>
                    <div>

                    </div>
                </form>
            </div>
        </div>
    )



}