'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('sanphams', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      tensp: {
        type: Sequelize.TEXT
      },
      ngaydang: {
        type: Sequelize.DATE
      },
      dientich: {
        type: Sequelize.DOUBLE
      },
      gia: {
        type: Sequelize.INTEGER
      },
      mota_soluoc: {
        type: Sequelize.TEXT
      },
      trangthai: {
        type: Sequelize.TEXT
      },
      id_loaisp: {
        type: Sequelize.INTEGER
      },
      id_huong: {
        type: Sequelize.INTEGER
      },
      id_duan: {
        type: Sequelize.INTEGER
      },
      id_user: {
        type: Sequelize.INTEGER
      },
      id_vitri: {
        type: Sequelize.INTEGER
      },
      id_huyen: {
        type: Sequelize.INTEGER
      },
      id_tinh: {
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
    return queryInterface.dropTable('sanphams');
  }
};