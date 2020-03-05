'use strict';
module.exports = (sequelize, DataTypes) => {
  const languages = sequelize.define('languages', {
    name: DataTypes.STRING
  }, {});
  languages.associate = function(models) {
    // associations can be defined here
  };
  return languages;
};