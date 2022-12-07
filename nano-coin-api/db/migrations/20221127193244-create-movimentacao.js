'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Movimentacoes', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      tipo_movimentacao: {
        allowNull: false,
        type: Sequelize.ENUM('entrada','saida')
      },
      valor: {
        allowNull: false,
        type: Sequelize.FLOAT
      },
      observacao: {
        allowNull: false,
        type: Sequelize.STRING
      },
      funcionario_id:{
        allowNull: false,
        type: Sequelize.INTEGER,
        references:{
          model: 'funcionarios',
          key: 'id'
        }
      },
      administrador_id:{
        allowNull: false,
        type: Sequelize.INTEGER,
        references:{
          model: 'administradores',
          key: 'id'
        }
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Movimentacoes');
  }
};