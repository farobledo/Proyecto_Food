require("dotenv").config();
const { YOUR_API_KEY } = process.env;
const axios = require("axios");
const { Diet, Recipe } = require("../db");

let dataApi = [];
const getApi = async () => {
  if (dataApi.length > 0) return dataApi;
  const data = await axios
    .get(
      `https://api.spoonacular.com/recipes/complexSearch?apiKey=${YOUR_API_KEY}&addRecipeInformation=true&number=100`
    )
    .then((p) => p.data.results); // peticion a la api
  const apiRecipes = data?.map((recipe) => {
    // filtro para sacar solo los datos necesarios
    return {
      id: recipe.id,
      title: recipe.title,
      image: recipe.image,
      summary: recipe.summary,
      spoonacularScore: recipe.spoonacularScore,
      healthScore: recipe.healthScore,
      diets: recipe.diets.map((each) => ({ name: each })),
      dishTypes: recipe.dishTypes,
      steps: recipe.analyzedInstructions[0]?.steps.map((each) => {
        return each.step;
      }),
    };
  });
  return (dataApi = apiRecipes);

};
const getDb = async () => {
  const dbRecipes = await Recipe.findAll({
    include: {
      model: Diet,
      attributes: ["name"],
      through: {
        attributes: [],
      }, //ver si la sintaxis esta bien escrita
    },
  });

  return dbRecipes;
};
const getApiId = async (id) => {
  try {
    const data = await axios
      .get(
        `https://api.spoonacular.com/recipes/${id}/information?apiKey=${YOUR_API_KEY}`
      )
      .then((p) => p.data);

    const recipe = {
      id: data.id,
      title: data.title,
      image: data.image,
      summary: data.summary.replace(/<[^>]*>?/g, ""),
      spoonacularScore: data.spoonacularScore,
      healthScore: data.healthScore,
      diets: data.diets.map((each) => ({ name: each })),
      instructions: data.instructions.replace(/<[^>]*>?/g, ""),
    };

    return recipe;
  } catch {
    return undefined;
  }
};
const getDbId = async (id) => {
  try {
    const recipe = await Recipe.findByPk(id, {
      include: {
        model: Diet,
        attributes: ["name"],
        through: {
          attributes: [],
        },
      },
    });
    return recipe;
  } catch {
    return undefined;
  }
};

module.exports = {
  getApi,
  getDb,
  getApiId,
  getDbId,
};
