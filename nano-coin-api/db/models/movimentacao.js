'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Movimentacao extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Movimentacao.belongsTo(models.Funcionario, {foreignKey: 'funcionario_id'})
      Movimentacao.belongsTo(models.Administrador, {foreignKey: 'administrador_id'})
    }
  }
  Movimentacao.init({
    tipo_movimentacao: DataTypes.ENUM('entrada','saida'),
    valor: DataTypes.FLOAT,
    observacao: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Movimentacao',
    tableName: 'movimentacoes',
  });
  return Movimentacao;
};