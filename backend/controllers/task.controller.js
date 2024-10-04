import taskService from "../services/task.service.js";

class TaskController {
  async createTask(req, res, next) {
    try {
      const task = await taskService.createTask(req.body, req.user._id);
      res.status(201).json(task);
    } catch (error) {
      next(error);
    }
  }

  async getAllTasks(req, res, next) {
    try {
      const tasks = await taskService.getAllTasks(req.user._id);
      res.json(tasks);
    } catch (error) {
      next(error);
    }
  }

  async getTaskById(req, res, next) {
    try {
      const task = await taskService.getTaskById(req.params.id, req.user._id);
      res.json(task);
    } catch (error) {
      next(error);
    }
  }

  async updateTask(req, res, next) {
    try {
      const task = await taskService.updateTask(
        req.params.id,
        req.user._id,
        req.body
      );
      res.json(task);
    } catch (error) {
      next(error);
    }
  }

  async deleteTask(req, res, next) {
    try {
      const result = await taskService.deleteTask(req.params.id, req.user._id);
      res.json(result);
    } catch (error) {
      next(error);
    }
  }
}

export default new TaskController();
