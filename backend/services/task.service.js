import taskRepository from "../repositories/task.repository.js";
import { NotFoundError } from "../errors/custom.errors.js";

class TaskService {
  async createTask(taskData) {
    return await taskRepository.createTask(taskData);
  }

  async getAllTasks() {
    return await taskRepository.getAllTasks();
  }

  async getTaskById(id) {
    const task = await taskRepository.getTaskById(id);
    if (!task) {
      throw new NotFoundError("Task not found");
    }
    return task;
  }

  async updateTask(id, updateData) {
    const task = await taskRepository.updateTask(id, updateData);
    if (!task) {
      throw new NotFoundError("Task not found");
    }
    return task;
  }

  async deleteTask(id) {
    const task = await taskRepository.deleteTask(id);
    if (!task) {
      throw new NotFoundError("Task not found");
    }
    return task;
  }
}

export default new TaskService();
