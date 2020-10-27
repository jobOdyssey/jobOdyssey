const { Sequelize, DataTypes } = require('sequelize');
const dotenv = require('dotenv');

dotenv.config();
const { DATABASE_URL } = process.env;
const sequelize = new Sequelize(DATABASE_URL);

const User = sequelize.define(
  'users',
  {
    // attributes
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      allowNull: false,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    schema: 'job_odyssey',
    timestamps: false,
    freezeTableName: true,
  }
);

const Application = sequelize.define(
  'applications',
  {
    // attributes
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      allowNull: false,
    },
    user_id: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    company: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    position: {
      type: DataTypes.STRING,
      // null OK
    },
    url: {
      type: DataTypes.STRING,
      // null OK
    },
    created_at: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    recent_activity: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM('planned', 'applied', 'rejected', 'interview scheduled', 'offered'),
      allowNull: false,
    },
    notes: {
      type: DataTypes.STRING,
      // null OK
    },
  },
  {
    schema: 'job_odyssey',
    timestamps: false,
    freezeTableName: true,
  }
);

User.hasMany(Application, { foreignKey: 'user_id' });

// Checking to see if we are connected
sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch((err) => {
    console.error('Unable to connect to the database:', err);
  });

module.exports = { sequelize, User, Application };