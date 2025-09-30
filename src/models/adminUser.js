import { DataTypes } from 'sequelize';
import { sequelizeTwo } from '../db/database.js';

const adminUser = sequelizeTwo.define('adminUser', {
    id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
    },
    firstName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    lastName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    password:{
        type: DataTypes.STRING,
        allowNull: false
    },
    imageUrl: {
        type: DataTypes.STRING, 
        defaultValue: null,
    },
    resetToken: {
        type: DataTypes.STRING,
        defaultValue: null,
    },
    resetTokenExpiresAt: {
        type: DataTypes.DATE,
        defaultValue: null,
    }
}, {
    timestamps: true 
});

export default adminUser;