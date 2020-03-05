'use strict';
module.exports = (sequelize, DataTypes) => {
  const config = sequelize.define('config', {
    fetch_key: DataTypes.STRING,
    value: DataTypes.STRING
  }, {});
  config.associate = function(models) {
    // associations can be defined here
  };
  return config;
};