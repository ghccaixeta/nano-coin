'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Administradores', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      nome_completo: {
        allowNull: false,
        type: Sequelize.STRING
        
      },
      login: {
        allowNull: false,
        unique: true,
        type: Sequelize.STRING
      },
      senha: {
        allowNull: false,
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal("NOW()")
        
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal("NOW()")
        
      }
    }).then(()=> {
      queryInterface.bulkInsert("Administradores", [
        {
        nome_completo: "Admin",
        login: "admin",
        senha: "$2b$12$jycJRAIuJh95vhkdaTpDEOggOJGCogPXWK8BR9irZZzIck4escote"
        }
    ]);
      
  })
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Administradores');
  }
};