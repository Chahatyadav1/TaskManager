const Task = require("../models/task.model");

exports.createTask = async (data) => {
  return await Task.create(data);
};

exports.getTasks = async () => {
  return await Task.find();
};

exports.updateTask = async (id, data) => {
  return await Task.findByIdAndUpdate(id, data, { new: true });
};

exports.deleteTask = async (id) => {
  return await Task.findByIdAndDelete(id);
};
