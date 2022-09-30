import axios from "axios";
//Actions Types

export const GET_ALL_RECIPES = "GET_ALL_RECIPES";
export const GET_RECIPE = "GET_RECIPE";
export const GET_RECIPE_NAME = "GET_RECIPE_NAME";
export const GET_DIETS = "GET_DIETS";
export const GET_ONLY_DB= "GET_ONLY_DB"
// el post no tiene action type xd perrrooooo
export const ORDER_BY_SCORE = "ORDER_BY_SCORE";
export const ORDER_BY_TITLE = "ORDER_BY_TITLE";
export const FILTER_BY_DIETS = "FILTERED_BY_DIETS";
       
                    //--->Actions<---//

//Gets

export const getAllRecipes = () =>async(dispatch)=>{
    try{
        const {data} = await axios.get(`http://localhost:3001/recipes`)
        return dispatch({
            type:GET_ALL_RECIPES,
            payload:data
        });
    }
    catch(err){
        console.log(err);
        throw err;
    };
};

export const getRecipe = (id)=>  async(dispatch)=> {
    try{
        const data = await axios.get(`http://localhost:3001/recipes/${id}`).then(q=>q.data)
        console.log("action:",data)
        return dispatch({
            type:GET_RECIPE,
            payload:data
        });
    }
    catch(err){
        console.log(err);
        throw err;
    };
};

export const getRecipeByName = (name)=> async       (dispatch)=>{
    try{
        const {data} = await axios.get(`http://localhost:3001/recipes?name=${name}`)
        
        return dispatch({
            type:GET_RECIPE_NAME,
            payload:data 
        });
    }
    catch(err){
        console.log(err)
        throw err
    }
};

export const getDiets = ()=>            async       (dispatch)=>{
    try{
        const diets = await axios.get("http://localhost:3001/types").then(p=>p.data)
        return dispatch({
            type:GET_DIETS,
            payload:diets
        });
    }
    catch(err){
        console.log(err)
        throw err
    };
};

export const getDbRecipes= ()=> async (dispatch)=>{
    try{
        const recipes= await axios.get("http://localhost:3001/recipes?onlyDb=true").then(p=>p.data)
        return dispatch({
            type:GET_ONLY_DB,
            payload:recipes
        })
    }
    catch(err){
        console.log(err)
        throw err
    }
}

//post

export const postNewRecipe=(payload)=> async (dispatch) => {
    try {
        var json = await axios.post(`http://localhost:3001/create`, payload)
        return json
    } catch (err) {
        console.log(err)
        throw err
    };
};;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;
//order

export const orderBySpoonacularScore=(data)=>async (dispatch)=>{
    try{
        return dispatch({
            type: ORDER_BY_SCORE,
            payload:data
        });
    }
    catch(err){
        console.log(err)
        throw err
    }
};;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;

export const orderByTitle=(order)=>{
    return {
        type: ORDER_BY_TITLE,
        payload:order
    };
};;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;


//filters

export const filterByDiet=(diet)=>{ 
    return {
        type: FILTER_BY_DIETS,
        payload:diet
    };
};;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;
