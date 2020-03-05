'use strict';
module.exports = (sequelize, DataTypes) => {
  const orders = sequelize.define('orders', {
    category: DataTypes.INTEGER,
    service: DataTypes.INTEGER,
    scheduled_time: DataTypes.DATE,
    user_id: DataTypes.INTEGER,
    date: DataTypes.ARRAY(DataTypes.DATE),
    service_amount: DataTypes.INTEGER,
    is_paid: DataTypes.BOOLEAN,
    payment_mode: DataTypes.STRING,
    transaction_id: DataTypes.STRING,
    comment: DataTypes.STRING,
    allocated_nurses: DataTypes.INTEGER
  }, {});
  orders.associate = function(models) {
    // associations can be defined here
  };
  return orders;
};