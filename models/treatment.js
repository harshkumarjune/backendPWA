'use strict';
module.exports = (sequelize, DataTypes) => {
  const treatment = sequelize.define('treatment', {
    title: DataTypes.STRING
  }, {});
  treatment.associate = function(models) {
    // associations can be defined here
  };
  return treatment;
};