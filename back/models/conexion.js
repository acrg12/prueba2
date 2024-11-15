const { Sequelize } = require("sequelize");

// Importar modelos
const TareaModel = require("./tarea");

// Configuración de la base de datos
const dbConfig = {
  database: "lista",
  username: "postgres",
  password: "12345",
  host: "localhost",
  dialect: "postgres",
};

// Crear instancia de Sequelize con la configuración
const sequelize = new Sequelize(
  dbConfig.database,
  dbConfig.username,
  dbConfig.password,
  {
    host: dbConfig.host,
    dialect: dbConfig.dialect,
  }
);

// Instanciar modelo
const Tarea = TareaModel(sequelize, Sequelize.DataTypes); // Instanciamos correctamente el modelo

// Sincronizar la base de datos
sequelize.sync({ force: false }).then(() => {
  console.log("Base de datos sincronizada");
});

// Exportar modelo y conexión
module.exports = {
  Tarea, // Exportamos la instancia correcta del modelo
  sequelize,
};
