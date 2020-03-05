'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('product_allocation_blocks', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      product_id: {
        type: Sequelize.INTEGER
      },
      state_id: {
        allowNull: true,
        type: Sequelize.INTEGER
      },
      city_id: {
        allowNull: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING
      },
      address: {
        type: Sequelize.STRING
      },
      contact_number: {
        type: Sequelize.INTEGER
      },
      contact_person: {
        type: Sequelize.STRING
      },
      branch_id: {
        type: Sequelize.INTEGER
      },
      locality: {
        type: Sequelize.STRING
      },
      landmark: {
        type: Sequelize.STRING
      },
      status: {
        type: Sequelize.INTEGER
      },
      pincode: {
        type: Sequelize.INTEGER
      },
      is_active: {
        type: Sequelize.INTEGER
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      primary_nurse: {
        allowNull: true,
        type: Sequelize.INTEGER
      },
      allocated_nurses: {
        type: Sequelize.ARRAY(Sequelize.INTEGER),
        allowNull: true
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('product_allocation_blocks');
  }
};