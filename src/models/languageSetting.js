import { DataTypes } from 'sequelize';
import { sequelizeTwo } from '../db/database.js';

const LanguageSettings = sequelizeTwo.define('LanguageSettings', {
    englishEnabled: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    },
    danishEnabled: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    },
    dropdownVisible: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    }
}, {
    timestamps: true
});

export default LanguageSettings;
