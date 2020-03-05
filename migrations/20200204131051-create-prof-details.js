'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('prof_details', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      user_id: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      phone_verified: {
        allowNull: true,
        type: Sequelize.BOOLEAN
      },
      allocated_branches: {
        allowNull: true,
        type: Sequelize.ARRAY(Sequelize.INTEGER)
      },
      allocated_product: {
        allowNull: true,
        type: Sequelize.INTEGER
      },
      start_date: {
        allowNull: true,
        type: Sequelize.DATE
      },
      join_date: {
        allowNull: true,
        type: Sequelize.DATE
      },
      end_date: {
        type: Sequelize.DATE
      },
      charge_per_month: {
        allowNull: true,
        type: Sequelize.INTEGER
      },
      allocate_creche: {
        allowNull: true,
        type: Sequelize.INTEGER
      },
      status: {
        allowNull: true,
        type: Sequelize.STRING
      },
      reg_id: {
        allowNull: true,
        type: Sequelize.STRING
      },
      services: {
        allowNull: true,
        type: Sequelize.ARRAY(Sequelize.JSONB)
      },
      allocate_customer: {
        allowNull: true,
        type: Sequelize.STRING
      },
      documents: {
        allowNull: true,
        type: Sequelize.ARRAY(Sequelize.JSONB)
      },
      allocate_appartment: {
        allowNull: true,
        type: Sequelize.INTEGER
      },
      is_loc_ap: {
        allowNull: true,
        type: Sequelize.BOOLEAN
      },
      specialization: {
        allowNull: true,
        type: Sequelize.ARRAY(Sequelize.JSONB)
      },
      organization_name: {
        allowNull: true,
        type: Sequelize.STRING
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
    return queryInterface.dropTable('prof_details');
  }
};