'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('mota_chitiets', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      id_loaisp: {
        type: Sequelize.INTEGER
      },
      id_sanpham: {
        type: Sequelize.INTEGER
      },
      chieudai: {
        type: Sequelize.DOUBLE
      },
      chieungang: {
        type: Sequelize.DOUBLE
      },
      phaply: {
        type: Sequelize.BOOLEAN
      },
      phongngu: {
        type: Sequelize.INTEGER
      },
      phongan: {
        type: Sequelize.INTEGER
      },
      bep: {
        type: Sequelize.INTEGER
      },
      santhuong: {
        type: Sequelize.DOUBLE
      },
      chodexehoi: {
        type: Sequelize.BOOLEAN
      },
      chinhchu: {
        type: Sequelize.BOOLEAN
      },
      loaidat: {
        type: Sequelize.TEXT
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
    return queryInterface.dropTable('mota_chitiets');
  }
};