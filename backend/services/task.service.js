import taskRepository from "../repositories/task.repository.js";
import { NotFoundError } from "../errors/custom.errors.js";

class TaskService {
  async createTask(taskData, userId) {
    taskData.userId = userId;
    return await taskRepository.createTask(taskData);
  }

  async getAllTasks(userId, page, limit) {
    return await taskRepository.getAllTasks(userId, page, limit);
  }

  async getTaskById(id, userId) {
    const task = await taskRepository.getTaskById(id, userId);
    if (!task) {
      throw new NotFoundError("Task not found");
    }
    return task;
  }

  async updateTask(id, userId, updateData) {
    const task = await taskRepository.updateTask(id, userId, updateData);
    if (!task) {
      throw new NotFoundError("Task not found");
    }
    return task;
  }

  async deleteTask(id, userId) {
    const task = await taskRepository.deleteTask(id, userId);
    if (!task) {
      throw new NotFoundError("Task not found");
    }
    return { message: "Task deleted successfully" };
  }
}

export default new TaskService();
