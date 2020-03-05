
export default (sequelize, DataTypes) => {
  const products = sequelize.define(
    'products',
    {
      product: {
        type: DataTypes.STRING,
        allowNull: false
      }
    },
    {}
  );
  products.associate = (models) => {
    // products.hasMany(models.cities, { foreignKey: 'product_id' });
    // products.hasMany(models.product_allocation_block, { foreignKey: 'product_id' });
  };
  return products;
};

