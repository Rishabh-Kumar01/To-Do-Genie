import { faker } from "@faker-js/faker";
import Task from "../models/task.model.js";

const generateFakeTask = () => ({
  title: faker.lorem.sentence(3, 5),
  description: faker.lorem.paragraph(),
  status: faker.helpers.arrayElement(["pending", "completed"]),
  dueDate: faker.date.future(),
});

export const seedDatabase = async (count = 10) => {
  try {
    await Task.deleteMany({}); // Clear existing tasks

    const fakeTasks = Array.from({ length: count }, generateFakeTask);
    await Task.insertMany(fakeTasks);

    console.log(`Database seeded successfully with ${count} tasks`);
    return count;
  } catch (error) {
    console.error("Error seeding database:", error);
    throw error;
  }
};
