
export default (sequelize, DataTypes) => {
  const users = sequelize.define(
    'users',
    {
      first_name: { type: DataTypes.STRING },
      last_name: { type: DataTypes.STRING },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        required: true,
        validate: {
          isEmail: true
        }
      },
      user_role:{
        type: DataTypes.ARRAY(DataTypes.INTEGER),
        allowNull: false
      },
      city_id: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      registration_id: {
        type: DataTypes.STRING
      },
      company_name: {
        type: DataTypes.STRING,
        allowNull: true
      },
      mobile_number: {
        type: DataTypes.BIGINT,
        allowNull: false,
        unique: true
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false
      },
      gender: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          isIn: [[1, 2, 3]]
        }
      },
      dob: {
        type: DataTypes.STRING,
        allowNull: true
      },
      profile_image: {
        type: DataTypes.STRING,
        allowNull: true
      },
      locality: {
        type: DataTypes.STRING,
        allowNull: true
      },
      document: {
        type: DataTypes.STRING,
        allowNull: true
      },
      pin_code: {
        type: DataTypes.INTEGER,
        allowNull: true
      },
      branch_id: {
        type: DataTypes.INTEGER,
        allowNull: true
      },
      landmark: {
        type: DataTypes.STRING,
        allowNull: true
      },
      address: {
        type: DataTypes.STRING,
        allowNull: true
      },
      current_status: {
        type: DataTypes.INTEGER,
        allowNull: true
      },
      is_active: {
        type: DataTypes.INTEGER,
        allowNull: true
      },
      is_verify: {
        type: DataTypes.INTEGER,
        allowNull: true
      },
      otp: {
        type: DataTypes.INTEGER,
        allowNull: true
      },
      otp_request_at: {
        type: DataTypes.STRING,
        allowNull: true
      },
      last_login_at:{
        type: DataTypes.STRING,
        allowNull: true
      },
      created_by:{
        type: DataTypes.INTEGER,
        allowNull: true
      },
      updated_by:{
        type: DataTypes.INTEGER,
        allowNull: true
      },
    }
  );

  users.associate = (models) => {
    users.belongsTo(models.cities, { foreignKey: 'city_id' });
    users.belongsTo(models.states, { foreignKey: 'state_id' });
    users.belongsTo(models.userRoles, { foreignKey: 'user_role' });
    users.belongsTo(models.branch, { foreignKey: 'branch_id' });
  };

  return users;
};
