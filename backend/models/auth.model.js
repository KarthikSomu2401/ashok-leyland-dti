const { Sequelize, Model, DataTypes } = require('sequelize');
const sequelize = new Sequelize('sqlite::memory:');
const envs = require("./configurations");

class Authentication extends Model {}
Authentication.init({
    username: DataTypes.STRING,
    password: DataTypes.STRING
}, { sequelize, modelName: 'authentication' });

(async() => {
    await sequelize.sync();
    const test_user = await Authentication.create({
        username: `${envs.TST_USR}`,
        password: `${envs.TST_PWD}`
    });
    console.log(test_user.toJSON());
})();