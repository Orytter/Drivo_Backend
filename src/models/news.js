import  { DataTypes } from 'sequelize';
import  {sequelizeTwo} from '../db/database.js';


const validNewsTypes = ['main News head', 'News of the week', 'News', 'Award winning', 'News from FDM']; 

const News = sequelizeTwo.define('News', {
  brand: {
    type: DataTypes.STRING,
  },
  model: {
    type: DataTypes.STRING,
  },
  bodyType: {
    type: DataTypes.STRING,
  },
  version: {
    type: DataTypes.STRING,
  },
  color: {
    type: DataTypes.STRING,
  },
  image: {
    type: DataTypes.TEXT,
  },
  type: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      isIn: {
        args: [validNewsTypes],
        msg: 'Invalid news type',
      },
    },
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  shortDescription: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  newsSource: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  trim:{
    type: DataTypes.STRING,
    allowNull: true,
  },
  is_deleted: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false, 
  },
});

export default News;                    