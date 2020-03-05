
export default (sequelize, DataTypes) => {
  const userRoles = sequelize.define(
    'userRoles',
    {
      type: {
        type: DataTypes.STRING,
        allowNull: false
      },
    },
    {}
  );
  userRoles.associate = (models) => {
    userRoles.hasMany(models.users, { foreignKey: 'user_role' });
  };
  return userRoles;
};
