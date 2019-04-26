'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      tendangnhap: {
        type: Sequelize.TEXT
      },
      matkhau: {
        type: Sequelize.TEXT
      },
      email: {
        type: Sequelize.TEXT
      },
      dienthoai: {
        type: Sequelize.TEXT
      },
      avatar: {
        type: Sequelize.TEXT
      },
      isactive: {
        type: Sequelize.BOOLEAN
      },
      role: {
        type: Sequelize.INTEGER
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
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('users');
  }
};