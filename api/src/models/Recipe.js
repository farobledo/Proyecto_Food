const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('recipe', {
    id: {      //identificacion
      type:DataTypes.UUID,
      defaultValue:DataTypes.UUIDV4,
      primaryKey: true,
      allowNull:false
    },
    title: {   //nombre
      type: DataTypes.STRING,
      allowNull: false,
    },
    summary: {  //resumen
      type: DataTypes.STRING(1000),
      allowNull: false,
    },
    spoonacularScore: { //puntuacion
      type: DataTypes.FLOAT(1),
      validate:{
        max:100,
        min:0
      }
    },
    instructions: { //preparacion
      type: DataTypes.STRING,
      allowNull: false,
      
    },
    healthScore: { // nivel de salud 
      type: DataTypes.FLOAT(1),
      validate:{
        max:100,
        min:0
      }
      
    },
    image:{
      type:DataTypes.STRING(1234)
    }
    /* cheap: { // barato
      type: DataTypes.BOOLEAN,
      
      
    }, */
    /* lowfodmap: { ->es una dieta<-
      type: DataTypes.BOOLEAN,
      
      
    }, */  
  },
  {
    timestamps:false
  })
  
}
