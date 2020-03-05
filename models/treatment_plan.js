
export default (sequelize, DataTypes) => {
  const treatment_plan = sequelize.define(
    'treatment_plan',
    {
      treatment_id: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      createdBy: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false
      },
      events: {
        type: DataTypes.ARRAY(DataTypes.INTEGER),
        allowNull: false
      },
    },
    {}
  );
  treatment_plan.associate = (models) => {
    treatment_plan.belongsTo(models.treatment, { foreignKey: 'treatment_id' });
    treatment_plan.belongsTo(models.users, { foreignKey: 'createdBy' });
  };
  return treatment_plan;
};