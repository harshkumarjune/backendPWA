
export default (sequelize, DataTypes) => {
  const cities = sequelize.define(
    'cities',
    {
      state_id: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      city: {
        type: DataTypes.STRING,
        allowNull: false
      },
      is_active: {
        type: DataTypes.INTEGER,
        allowNull: true
      }
    },
    {}
  );
  cities.associate = (models) => {
    // cities.belongsTo(models.states, { foreignKey: 'city_id' });
    // cities.hasMany(models.users, { foreignKey: 'city_id' });
    // cities.hasMany(models.branch, { foreignKey: 'city_id' });
    // cities.hasMany(models.product_allocation_block, { foreignKey: 'city_id' });
  };
  return cities;
};
