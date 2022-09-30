import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Card from "./Card"
import { getAllRecipes, getDiets, filterByDiet, getRecipeByName, getDbRecipes } from "../Redux/Actions";
import { orderBySpoonacularScore, orderByTitle } from "../Redux/Actions";
import Page from "./Pagination";
import "../css/Home.css"
import Load from "./Load";


export default function Home() {

    const dispatch = useDispatch();
    const recipes = useSelector(state => state.allRecipes);
    const diets = useSelector(state => state.allDiets);

    useEffect(() => {

        dispatch(getDiets())
    }, [dispatch]);
    useEffect(() => {
        setLoad(true)
        dispatch(getAllRecipes())
        setLoad(false)
    }, [dispatch]);

    const [load, setLoad] = useState(true)
    const [order, setOrder] = useState("");
    const [score, setScore] = useState("");
    const [buscar, setBuscar] = useState("");
    //page
    const [currentPage, setCurrentPage] = useState(1);
    const [recipesPerPage, setRecipesPerPage] = useState(9); // ACA SE MODIFICA EL NUMERO DE RECETAS POR PAGINA
    const indexOfLastRecipe = currentPage * recipesPerPage;
    const indexOfFirstRecipe = indexOfLastRecipe - recipesPerPage;
    const currentRecipes = recipes?.slice(indexOfFirstRecipe, indexOfLastRecipe);
    const paginado = (pageNumber) => {
        setCurrentPage(pageNumber);
    };
    const nojoda = () => {
        setRecipesPerPage();

    };
    //Ordenado y Filtrado
    const filteredDiet = (q) => {
        dispatch(filterByDiet(q.target.value))
        //setCurrentPage(1)
        q.preventDefault()
    };
    const orderRecipesTitle = (q) => {
        dispatch(orderByTitle(q.target.value))
        //setCurrentPage(1)
        setOrder(q.target.value)
        q.preventDefault()
    };
    const orderRecipesSpoonScore = (q) => {
        dispatch(orderBySpoonacularScore(q.target.value))
        console.log(q.target.value)
        //setCurrentPage(1)
        setScore(q.target.value)
        q.preventDefault()
    };

    //formulario de Busqueda
    const Change = (q) => {
        q.preventDefault()
        setBuscar(q.target.value);
        console.log(q.target.value)


    };
    const Submit = (q) => {
        q.preventDefault()
        dispatch(getRecipeByName(buscar));
        setBuscar("")


    }
    const onlyDb = (q) => {

        dispatch(getDbRecipes())
    }

    return (
        <div className="backgraund">

            {(recipes === undefined) || (diets === undefined)
                ?
                <Load />
                : <>
                    <div className="firstContainer">
                        <form action="submit">
                            <label className="Buscar"><b>Busca tu Receta</b></label>
                            <input className="Buscador" placeholder="Nombre Receta Favorita" type="search" value={buscar} name="Busca" onChange={(q) => Change(q)} ></input>
                            <button type="submit" onClick={(q) => Submit(q)}>Buscar!</button>
                        </form>
                        <select onChange={q => orderRecipesTitle(q)}>
                            <option value="" >Selecionar Orden</option>
                            <option value="Asc">A to Z</option>
                            <option value="Desc">Z to A</option>
                        </select>
                        {/*  <select  onChange={q => orderRecipesSpoonScore(q)}>
                    <option value="" >Select Score</option>
                    <option value="SpoonacularMax">Max Spoonacular Score</option>
                    <option value="SpoonacularMin">Min Spoonacular Score</option>
                </select> */}
                        <select onChange={q => filteredDiet(q)}>
                            <option value="">Selecionar Dieta</option>
                            {diets?.map(diet => {
                                return (<option value={diet.name}>{diet.name}</option>)
                            })
                            }
                        </select>
                        <button onClick={() => { onlyDb() }}>Crea Dieta</button>

                    </div>
                    <div className="secondContainer">
                        <div className="pagecontained">
                            <Page className="page" recipesPerPage={recipesPerPage} allRecipes={recipes?.length} paginado={paginado}></Page>
                            <div>

                            </div>
                            <div className="Home">

                                {currentRecipes?.map((recipe, i) => {
                                    return (
                                        <Link className="link" to={`/recipe/${recipe.id}`}>
                                            <Card
                                                Image={recipe.image}
                                                title={recipe.title}
                                                diets={recipe.diets?.map(r => <p className="d">{r.name}</p>)}
                                                key={i}
                                                id={recipe.id}
                                            />
                                        </Link>
                                    )
                                })
                                }
                            </div>
                        </div>

                        <div>
                            <Page className="page" recipesPerPage={recipesPerPage} allRecipes={recipes?.length} paginado={paginado}></Page>
                        </div>


                    </div>
                </>}
        </div>
    )
}