import { faker } from "@faker-js/faker";
import fs from "fs/promises";
import path from "path";
import User from "../models/user.model.js";
import Task from "../models/task.model.js";
import authService from "../services/auth.service.js";

const generateFakeTask = (userId) => ({
  title: faker.lorem.sentence(3, 5),
  description: faker.lorem.paragraph(),
  status: faker.helpers.arrayElement(["pending", "completed"]),
  dueDate: faker.date.future(),
  userId: userId,
});

const generateFakeUser = () => ({
  username: faker.internet.userName(),
  email: faker.internet.email(),
  password: faker.internet.password(8),
});

export const seedDatabase = async (count = 10) => {
  try {
    await User.deleteMany({});
    await Task.deleteMany({});

    const users = [];
    const userCredentials = [];

    for (let i = 0; i < count; i++) {
      const fakeUser = generateFakeUser();
      const { user } = await authService.register(fakeUser);
      users.push(user);
      userCredentials.push({
        username: fakeUser.username,
        email: fakeUser.email,
        password: fakeUser.password,
      });

      const taskCount = Math.floor(Math.random() * 10) + 1;
      const fakeTasks = Array.from({ length: taskCount }, () =>
        generateFakeTask(user._id)
      );
      await Task.insertMany(fakeTasks);
    }

    // Ensure the public directory exists
    const publicDir = path.join(process.cwd(), "public");
    await fs.mkdir(publicDir, { recursive: true });

    // Write user credentials to file
    const filePath = path.join(publicDir, "seeded_users.json");
    await fs.writeFile(filePath, JSON.stringify(userCredentials, null, 2));

    console.log(
      `Database seeded successfully with ${count} users and their tasks`
    );
    console.log(`User credentials saved to ${filePath}`);

    return { users: count, tasks: await Task.countDocuments() };
  } catch (error) {
    console.error("Error seeding database:", error);
    throw error;
  }
};
