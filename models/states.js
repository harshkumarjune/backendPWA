
export default (sequelize, DataTypes) => {
  const states = sequelize.define(
    'states',
    {
      state: {
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
  states.associate = (models) => {
    states.hasMany(models.cities, { foreignKey: 'id' });
    states.belongsTo(models.users, { foreignKey: 'id' });
  };
  return states;
};
