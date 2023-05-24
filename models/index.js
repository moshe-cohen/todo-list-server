const Sequelize = require('sequelize');
const TaskModel = require('./model_task');

const sequelize = new Sequelize('postgres', 'postgres', '301674305', {
  host: 'localhost',
  dialect: 'postgres'
});

const Task = TaskModel(sequelize, Sequelize);

sequelize.sync({ force: false })
  .then(() => {
    console.log('Tables have been synchronized')
  });

module.exports = {
  Task
};
