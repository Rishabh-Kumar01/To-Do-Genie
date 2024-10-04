import Task from "../models/task.model.js";

class TaskRepository {
  async createTask(taskData) {
    return await Task.create(taskData);
  }

  async getAllTasks(userId, page = 1, limit = 9) {
    const skip = (page - 1) * limit;
    const tasks = await Task.find({ userId })
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    const total = await Task.countDocuments({ userId });

    return {
      tasks,
      currentPage: page,
      totalPages: Math.ceil(total / limit),
      totalTasks: total,
    };
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
