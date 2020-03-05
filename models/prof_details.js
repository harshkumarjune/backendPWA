export default (sequelize, DataTypes) => {
  const prof_details = sequelize.define(
    'prof_details',
    {
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      phone_verified: {
        type: DataTypes.BOOLEAN,
        allowNull: true
      },
      allocated_branches: {
        type: DataTypes.ARRAY(DataTypes.INTEGER),
        allowNull: false
      },
      allocated_product: {
        type: DataTypes.INTEGER,
        allowNull: true
      },
      start_date: {
        type: DataTypes.DATE,
        allowNull: true
      },
      join_date: {
        type: DataTypes.DATE,
        allowNull: true
      },
      end_date: {
        type: DataTypes.DATE,
        allowNull: true
      },
      charge_per_month: {
        type: DataTypes.INTEGER,
        allowNull: true
      },
      allocate_creche: {
        type: DataTypes.INTEGER,
        allowNull: true
      },
      status: {
        type: DataTypes.STRING,
        allowNull: true
      },
      reg_id: {
        type: DataTypes.STRING,
        allowNull: true
      },
      services: {
        type: DataTypes.ARRAY(DataTypes.JSONB),
        allowNull: true
      },
      allocate_customer: {
        type: DataTypes.STRING,
        allowNull: true
      },
      documents: {
        type: DataTypes.ARRAY(DataTypes.JSONB),
        allowNull: true
      },
      allocate_appartment: {
        type: DataTypes.INTEGER,
        allowNull: true
      },
      is_loc_ap: {
        type: DataTypes.BOOLEAN,
        allowNull: true
      },
      specialization: {
        type: DataTypes.ARRAY(DataTypes.JSONB),
        allowNull: true
      },
      organization_name: {
        type: DataTypes.STRING,
        allowNull: true
      },
    },
    {}
  );
  prof_details.associate = (models) => {
  };
  return prof_details;
};
