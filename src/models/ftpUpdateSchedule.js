import { DataTypes } from 'sequelize';
import { sequelizeTwo } from '../db/database.js';

const UpdateSchedule = sequelizeTwo.define('UpdateSchedule', {
  dayOfWeek: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      isIn: [['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']]
    },
    comment: 'Day of the week for the scheduled update'
  },
  timeSlot: {
    type: DataTypes.TIME,
    allowNull: false,
    comment: 'Time of day for the scheduled update in HH:MM:SS format'
  },
  isActive: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
    comment: 'Indicates if the schedule is currently active'
  }
});

export default UpdateSchedule;
