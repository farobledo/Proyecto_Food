require('dotenv').config();
const { Router } = require('express');
const { YOUR_API_KEY} = process.env;
const axios = require('axios');
const {Diet,Recipe} = require('../db');
const {Op} = require("sequelize");
const {getAllRecipes,getIdRecipe,loadDietsInDb,create,on} = require("../controllers/index")
//const cors = require("cors")
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const router = Router();


router.get("/",on)
router.get("/ej", async(req,res)=>{
    const ejemplo = await Recipe.create({
        title:"COMIDA",
        summary:"esto es un resumen esto es un resumen esto es un resumenesto es un resumenesto es un resumenesto es un resumenesto es un resumenesto es un resumenesto es un resumenesto es un resumenv",
        spoonacularScore: 90,
        healthScore:30,
        instructions:"estas son instrucionesestas son instrucionesestas son instrucionesestas son instrucionesestas son instrucionesestas son instrucionesestas son instrucionesestas son instrucionesestas son instrucionesestas son instruciones",
    })
    res.send("tapronto").status(200)
});
router.get("/recipes",getAllRecipes);
router.get("/recipes/:id",getIdRecipe);
router.get("/types",loadDietsInDb);
router.get("/")

router.post("/create",create);

 
// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);


module.exports = router;
