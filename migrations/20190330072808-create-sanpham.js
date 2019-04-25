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
      image:{
        type:Sequelize.TEXT
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
        type: Sequelize.INTEGER,
        references:{
          model:'loaisps',
          key:'id'
        }
      },
      id_huong: {
        type: Sequelize.INTEGER,
        references:{
          model:'huongs',
          key:'id'
        }
      },
      id_duan: {
        type: Sequelize.INTEGER,
        references:{
          model:'duans',
          key:'id'
        }
      },
      id_user: {
        type: Sequelize.INTEGER,
        references:{
          model:'users',
          key:'id'
        }
      },
      id_vitri: {
        type: Sequelize.INTEGER,
        references:{
          model:'vitris',
          key:'id'
        }
      },
      id_huyen: {
        type: Sequelize.INTEGER,
        references:{
          model:'huyens',
          key:'id'
        }
      },
      id_tinh: {
        type: Sequelize.INTEGER,
        references:{
          model:'tinhs',
          key:'id'
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
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('sanphams');
  }
};