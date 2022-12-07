'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Administrador extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Administrador.hasMany(models.Funcionario, {foreignKey: 'administrador_id'})
      Administrador.hasMany(models.Movimentacao, {as: 'Movimentacoes', foreignKey: 'administrador_id'})
    }
  }
  Administrador.init({
    nome_completo: DataTypes.STRING,
    login: DataTypes.STRING,
    senha: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Administrador',
    tableName: 'administradores',
  });
  return Administrador;
};