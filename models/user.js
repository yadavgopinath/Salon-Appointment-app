const Sequelize = require  ('sequelize');
const sequelize = require('../util/database');
const { type } = require('os');


const Users = sequelize.define('users',{
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false
    },
     
      email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true 
      },
      phoneno:{
        type:Sequelize.BIGINT,
        allowNull: false,
        unique: true 

      },
      password: {
        type: Sequelize.STRING,
        allowNull: false
      },
    
   
 
});
module.exports = Users;