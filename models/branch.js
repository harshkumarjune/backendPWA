export default (sequelize, DataTypes) => {
  const branch = sequelize.define(
    'branch',
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false
      },
      city_id: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      is_active: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
    },
    {}
  );
  branch.associate = (models) => {
    branch.belongsTo(models.cities, { foreignKey: 'city_id' });
    branch.hasMany(models.users, { foreignKey: 'branch_id' });
    branch.hasMany(models.product_allocation_block, { foreignKey: 'branch_id' });
  };
  return branch;
};
