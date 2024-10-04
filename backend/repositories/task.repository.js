import Task from "../models/task.model.js";

class TaskRepository {
  async createTask(taskData) {
    return await Task.create(taskData);
  }

  async getAllTasks() {
    return await Task.find();
  }

  async getTaskById(id) {
    return await Task.findById(id);
  }

  async updateTask(id, updateData) {
    return await Task.findByIdAndUpdate(id, updateData, { new: true });
  }

  async deleteTask(id) {
    return await Task.findByIdAndDelete(id);
  }
}

export default new TaskRepository();
