import { seedDatabase } from "../scripts/seed.js";

export const seedDatabaseController = async (req, res, next) => {
  try {
    const count = parseInt(req.query.count) || 10;
    const result = await seedDatabase(count);
    res.status(200).json({
      message: `Database seeded successfully`,
      data: {
        usersCreated: result.users,
        tasksCreated: result.tasks,
      },
    });
  } catch (error) {
    next(error);
  }
};
