module.exports = (sequelize, type) => {
  return sequelize.define(
    "tarea",
    {
      idtarea: {
        type: type.INTEGER,
        primaryKey: true,
        autoIncrement: true, // Permite que la clave primaria sea autoincremental
      },
      titulo: {
        type: type.STRING(250),
      },
      descrip: {
        type: type.STRING(250),
      },
      estado: {
        type: type.BOOLEAN,
      },
    },
    {
      timestamps: false,
      tableName: "tarea",
    }
  );
};
