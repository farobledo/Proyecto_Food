import { GET_ALL_RECIPES,GET_DIETS,GET_RECIPE, GET_RECIPE_NAME,GET_ONLY_DB } from "../Actions";
import {FILTER_BY_DIETS} from "../Actions";
import { ORDER_BY_SCORE,ORDER_BY_TITLE } from "../Actions";

const initialstate = {
    allRecipes : [], // todas las recetas
    copyRecipes:[], // para filtrado
    allDiets:[], //todas las dietas
    recipe:[], // para el detalle de las recetas
};
 
const edit = (state=initialstate,action)=> {
    switch(action.type){
        case GET_ALL_RECIPES:
            return {
                ...state,
                allRecipes:action.payload,
                copyRecipes:action.payload
            };
        case GET_RECIPE:
            console.log("reducer:",action.payload)
            return{
                ...state,
                recipe:action.payload
            };
        case GET_DIETS:
           
            return{
                ...state,
                allDiets:action.payload
            };
        case GET_RECIPE_NAME:
            return {
                ...state,
                allRecipes: action.payload
            };
        case GET_ONLY_DB:
            console.log(action.payload)
            return{
                ...state,
                allRecipes:action.payload
            }
        case ORDER_BY_SCORE:
            const order = (a,b)=>{
                if(action.payload === "SpoonacularMax"){
                    if(a.spoonacularScore < b.spoonacularScore){
                        console.log(a,b)
                        return 1
                    }
                    if (b.spoonacularScore < a.spoonacularScore){
                        return -1
                    }
                    return 0
                }
                else if(action.payload === "SpoonacularMin"){
                    if(a.spoonacularScore < b.spoonacularScore){
                        return -1
                    }
                    if (b.spoonacularScore < a.spoonacularScore){
                        return 1
                    }
                    return 0
                }
            }
            
            const orderRecipesSpoonScore = state.allRecipes.sort((a,b)=>order(a,b))
            
            return {
                ...state,
                allRecipes: orderRecipesSpoonScore
            };
        case ORDER_BY_TITLE:
            const orderRecipesTitle = action.payload === "Asc" ? 
                state.allRecipes.sort((a,b)=>{
                    if(a.title.toLowerCase() > b.title.toLowerCase()){
                        return 1
                    }
                    if (b.title.toLowerCase() > a.title.toLowerCase()){
                        return -1
                    }
                    return 0
                }) : state.allRecipes.sort((a,b)=>{
                    if(a.title.toLowerCase() > b.title.toLowerCase()){
                        return -1
                    }
                    if (b.title.toLowerCase() > a.title.toLowerCase()){
                        return 1
                    }
                    return 0
                })
            return {
                ...state,
                allRecipes: orderRecipesTitle
            } 
        case FILTER_BY_DIETS:
            const recipes = state.copyRecipes
            const dietFiltered = action.payload === "" ? recipes : recipes.filter(recipe => {
                    let diet = recipe.diets.map(d => d.name)
                
                    if (diet.includes(action.payload)){
                        
                        return recipe
                    }
                    return null
                })  
            return {
                ...state,
                allRecipes: dietFiltered
            }
        default:
            return {state}
     }
 }
 export default edit;