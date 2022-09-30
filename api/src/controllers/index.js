require('dotenv').config()
const {YOUR_API_KEY,YOUR_API_KEY2} = process.env; 
const axios = require('axios');
const {Diet,Recipe} = require('../db');
const {getApi,getApiId,getDb,getDbId}= require("./gets")



async function on(req,res){
    res.send("server on").status(200)
}
async function getAllRecipes(req,res,next){
    try {
        const name = req.query.name; // capturo el nombre pasado por query
        const onlyDb = req.query.onlyDb
        const dataApi = await getApi()
        const dataDb = await getDb()
        const data = dataDb.concat(dataApi)
            if(onlyDb === "true"){
                res.send(dataDb).status(200)
            
            }
            if(name){
             let recipe = data.filter(recipe => recipe.title?.toLowerCase().includes(name.toString().toLowerCase()));
                if(recipe.length){
                    res.status(200).send(recipe)
            }
                else{
                    res.status(400).send("Recipe not exist")  
            };
        }
        else{
            res.status(200).send(data)
        };
    }
    catch(err){
        console.log(err)
        next(err)
    };  
};

async function getIdRecipe(req,res,next){
 try{
    const id = req.params.id
    const dataApi = await getApiId(id) 
    const dataDb = await getDbId(id)
    console.log("api:",dataApi)
    console.log("db:",dataDb)
    dataApi?res.status(200).send(dataApi):res.status(200).send(dataDb)
 
 } 
 catch(err){
    console.log(err)
    next(err)
 }
};

async function loadDietsInDb(req,res,next){
   try{ 
        const GlutenFree = await Diet.findOrCreate({
            where:{name:"gluten free"}
        });
        const Vegetarian = await Diet.findOrCreate({
            where:{name:"dairy free"}
        });
        const LactoVegetarian = await Diet.findOrCreate({
            where:{name:"lacto ovo vegetarian"}
        });
        /* const OvoVegetarian = await Diet.findOrCreate({
            where:{name:"Ovo-Vegetarian"}
        }); */
        const Vegan = await Diet.findOrCreate({
            where:{name:"vegan"}
        });
        const Pecetarian = await Diet.findOrCreate({
            where:{name:"paleolithic"}
        });
        const Paleo = await Diet.findOrCreate({
            where:{name:"primal"}
        });
        const LowFODMAP = await Diet.findOrCreate({
            where:{name:"pescatarian"}
        });
        const Ketogenic = await Diet.findOrCreate({
            where:{name:"fodmap friendly"}
        }); 
        const aa = await Diet.findOrCreate({
            where:{name:"whole 30"}
        });   
        const diets = await Diet.findAll()
        res.send(diets).status(200)// envia un array de obejetos cada uno de la forma {name:"namediet"}
      
    }
    catch(err){
        console.log(err)
        
    }
  
}
async function create (req,res,next){
    try {
        const {title, summary, spoonacularScore, healthScore, instructions, image, diets} = req.body;
        const recipeCreate = await Recipe.create({
            title,
            summary,
            spoonacularScore,
            healthScore,
            instructions,
            image
        });
        const proms = diets.map(diet => recipeCreate.addDiet(diet));
        await Promise.all(proms);

        res.status(200).send({ msg: "Recipe successfully created" });

    } catch (error) {
        next(error);
    };
};


module.exports = {
    getAllRecipes,
    getIdRecipe,
    loadDietsInDb,
    create,
    on
};





























