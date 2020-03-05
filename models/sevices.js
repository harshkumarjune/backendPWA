
export default (sequelize, DataTypes) => {
  const services = sequelize.define(
    'services',
    {
      product_id: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      product_category_id: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false
      },
      icon: {
        type: DataTypes.STRING,
        allowNull: false
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: false
      },
      price: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      discount: {
        type: DataTypes.INTEGER,
        allowNull: true
      },
      is_active: {
        type: DataTypes.INTEGER,
        allowNull: true
      }
    },
    {}
  );
  services.associate = (models) => {
    services.belongsTo(models.products, { foreignKey: 'product_id' });
    services.belongsTo(models.categories, { foreignKey: 'product_category_id'})
  };
  return services;
};
