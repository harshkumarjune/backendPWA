'use strict';
module.exports = (sequelize, DataTypes) => {
  const schedules = sequelize.define('schedules', {
    user_id: DataTypes.INTEGER,
    schedules: DataTypes.ARRAY(DataTypes.TIME),
    day: DataTypes.DATEONLY
  }, {});
  schedules.associate = function(models) {
    // associations can be defined here
  };
  return schedules;
};