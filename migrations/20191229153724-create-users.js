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
      first_name: {
        type: Sequelize.STRING
      },
      last_name: {
        type: Sequelize.STRING
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false
      },
      city_id: {
        type: Sequelize.INTEGER
      },
      state_id: {
        type: Sequelize.INTEGER
      },
      user_role: {
        type: Sequelize.ARRAY(Sequelize.INTEGER)
      },
      registration_id: {
        type: Sequelize.STRING
      },
      company_name: {
        type: Sequelize.STRING
      },
      mobile_number: {
        type: Sequelize.BIGINT,
        allowNull: false
      },
      password: {
        type: Sequelize.STRING
      },
      gender: {
        type: Sequelize.INTEGER
      },
      address: {
        type: Sequelize.STRING
      },
      dob: {
        type: Sequelize.STRING
      },
      profile_image: {
        type: Sequelize.STRING
      },
      document: {
        type: Sequelize.STRING
      },
      locality: {
        type: Sequelize.STRING
      },
      pin_code: {
        type: Sequelize.INTEGER
      },
      landmark: {
        type: Sequelize.STRING
      },
      branch_id: {
        type: Sequelize.INTEGER
      },
      current_status: {
        type: Sequelize.INTEGER
      },
      is_active: {
        type: Sequelize.INTEGER
      },
      is_verify: {
        type: Sequelize.INTEGER
      },
      otp: {
        type: Sequelize.INTEGER
      },
      otp_request_at: {
        type: Sequelize.STRING
      },
      last_login_at: {
        type: Sequelize.STRING
      },
      created_by: {
        type: Sequelize.INTEGER
      },
      updated_by: {
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