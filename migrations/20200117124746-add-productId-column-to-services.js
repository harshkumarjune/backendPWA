'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {

      return Promise.all([1,2]);
  },

  down: (queryInterface, Sequelize) => {
    return Promise.all([1,2])
  }
};
