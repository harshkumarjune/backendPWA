'use strict';
module.exports = (sequelize, DataTypes) => {
  const categories = sequelize.define('categories', {
    type: DataTypes.STRING,
    allocated_services: {
      type: DataTypes.ARRAY(DataTypes.INTEGER),
      allowNull: true
    },
    icon: DataTypes.STRING,
    is_active: {
      type: DataTypes.INTEGER,
      defaultValue: 1
    }
  }, {});
  categories.associate = function(models) {
    // associations can be defined here
  };
  return categories;
};