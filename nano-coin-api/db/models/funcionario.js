'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Funcionario extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Funcionario.belongsTo(models.Administrador, {foreignKey: 'administrador_id'})
      Funcionario.hasMany(models.Movimentacao, {as: 'Movimentacoes', foreignKey: 'funcionario_id'})
    }
  }
  Funcionario.init({
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
      
    },
    nome_completo: DataTypes.STRING,
    login: DataTypes.STRING,
    senha: DataTypes.STRING,
    saldo_atual: DataTypes.FLOAT
  }, {
    sequelize,
    modelName: 'Funcionario',
    tableName: 'funcionarios',
  });
  return Funcionario;
};