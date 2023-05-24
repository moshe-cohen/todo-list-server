const models = require('../models');

exports.getAllTasks = (req, res) => {
  models.Task.findAll()
    .then(tasks => res.status(200).send(tasks))
    .catch(error => res.status(400).send(error));
};

exports.getTasksInPages = async (req, res) => {
  const page = Number(req.params.page) || 1;
  const limit = 10;
  const offset = (page - 1) * limit;

  try {
    const tasks = await models.Task.findAll({
      limit: limit,
      offset: offset,
      order: [['createdAt', 'DESC']],
    });

    res.status(200).send(tasks);
  } catch (error) {
    res.status(400).send(error);
  }
};


exports.createTask = (req, res) => {
  models.Task.create({
    name: req.body.name,
    description: req.body.description
  })
    .then(task => res.status(201).send(task))
    .catch(error => res.status(400).send(error));
};

exports.getTaskById = (req, res) => {
  models.Task.findByPk(req.params.id)
    .then(task => {
      if (!task) {
        return res.status(404).send({ message: 'Task not found' });
      }
      return res.status(200).send(task);
    })
    .catch(error => res.status(400).send(error));
};

exports.updateTask = (req, res) => {
  console.log("id   " + req.params.id);
  models.Task.findByPk(req.params.id)
    .then(task => {
      if (!task) {
        return res.status(404).send({ message: 'Task not found' });
      }
      return task.update({
        name: req.body.name || task.name,
        description: req.body.description || task.description,
        done: req.body.done || task.done
      })
        .then(updatedTask => res.status(200).send(updatedTask))
        .catch(error => res.status(400).send(error));
    })
    .catch(error => res.status(400).send(error));
};

exports.deleteTask = (req, res) => {
  console.log(req.params.id);
  models.Task.findByPk(req.params.id)
    .then(task => {
      if (!task) {
        return res.status(404).send({ message: 'Task not found' });
      }
      return task.destroy()
        .then(() => res.status(204).send())
        .catch(error => res.status(400).send(error));
    })
    .catch(error => res.status(400).send(error));
};
