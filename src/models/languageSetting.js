import { DataTypes } from 'sequelize';
import { sequelize2 } from '../db/database';

const LanguageSettings = sequelize2.define('LanguageSettings', {
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

module.exports = LanguageSettings;
