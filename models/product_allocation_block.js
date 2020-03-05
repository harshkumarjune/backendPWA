'use strict';
export default (sequelize, DataTypes) => {
  const product_allocation_block = sequelize.define(
    'product_allocation_block',
    {
      product_id: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      state_id: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      city_id: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false
      },
      address: {
        type: DataTypes.STRING,
        allowNull: false
      },
      locality: {
        type: DataTypes.STRING,
        allowNull: true
      },
      landmark: {
        type: DataTypes.STRING,
        allowNull: true
      },
      contact_number: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      contact_person: {
        type: DataTypes.STRING,
        allowNull: true
      },
      status: {
        type: DataTypes.INTEGER,
        allowNull: true
      },
      branch_id: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      pincode: {
        type: DataTypes.INTEGER,
        allowNull: true
      },
      is_active: {
        type: DataTypes.INTEGER,
        allowNull: true
      },
      primary_nurse: {
        type: DataTypes.INTEGER,
        allowNull: true
      },
      allocated_nurses: {
        type: DataTypes.ARRAY(DataTypes.INTEGER),
        allowNull: true
      }
    },
    {}
  );
  product_allocation_block.associate = (models) => {
    product_allocation_block.hasMany(models.cities, { foreignKey: 'id' });
    product_allocation_block.hasMany(models.products, { foreignKey: 'id' });
    product_allocation_block.hasMany(models.branch, { foreignKey: 'id' });
  };
  return product_allocation_block;
};
