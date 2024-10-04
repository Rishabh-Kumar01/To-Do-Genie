import Task from "../models/task.model.js";

class TaskRepository {
  async createTask(taskData) {
    return await Task.create(taskData);
  }

  async getAllTasks(userId) {
    return await Task.find({ userId });
  }

  async getTaskById(id, userId) {
    return await Task.findOne({ _id: id, userId });
  }

  async updateTask(id, userId, updateData) {
    return await Task.findOneAndUpdate({ _id: id, userId }, updateData, {
      new: true,
    });
  }

  async deleteTask(id, userId) {
    return await Task.findOneAndDelete({ _id: id, userId });
  }
}

export default new TaskRepository();
