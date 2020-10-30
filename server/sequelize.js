
import pkg from 'sequelize';
const { Sequelize, DataTypes } = pkg;
import dotenv from 'dotenv';

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
      defaultValue: Sequelize.UUIDV4,
      unique: true,
    },
    social_id: {
      type: DataTypes.STRING,
      allowNull: true,
      unique: true,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
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
      defaultValue: DataTypes.UUIDV4,
      unique: true,
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
      defaultValue: DataTypes.NOW,
      allowNull: false,
    },
    recent_activity: {
      type: DataTypes.DATEONLY,
      defaultValue: DataTypes.NOW,
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
    archive: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
      allowNull: false,
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


export { sequelize, User, Application }