'use strict';
module.exports = (sequelize, DataTypes) => {
  const treatment_event = sequelize.define('treatment_event', {
    event: DataTypes.STRING
  }, {});
  treatment_event.associate = function(models) {
    // associations can be defined here
  };
  return treatment_event;
};