import User from "../models/user.model.js";
import { CustomError } from "../errors/custom.errors.js";

class AuthService {
  async register(userData) {
    const { username, email, password } = userData;

    const existingUser = await User.findOne({ $or: [{ username }, { email }] });
    if (existingUser) {
      throw new CustomError("Username or email already exists", 400);
    }

    const user = new User({ username, email, password });
    await user.save();

    return { success: true };
  }

  async login(username, password) {
    const user = await User.findOne({ username });
    if (!user || !(await user.comparePassword(password))) {
      throw new CustomError("Invalid username or password", 401);
    }

    const accessToken = user.generateAccessToken();
    const refreshToken = user.generateRefreshToken();

    user.refreshToken = refreshToken;
    await user.save();

    return {
      user: { _id: user._id, username: user.username, email: user.email },
      accessToken,
      refreshToken,
    };
  }

  async logout(userId) {
    const user = await User.findById(userId);
    if (!user) {
      throw new CustomError("User not found", 404);
    }

    user.refreshToken = null;
    await user.save();
  }

  async refreshToken(refreshToken) {
    const user = await User.findOne({ refreshToken });
    if (!user) {
      throw new CustomError("Invalid refresh token", 401);
    }

    const accessToken = user.generateAccessToken();
    return { accessToken };
  }

  async changePassword(userId, oldPassword, newPassword) {
    const user = await User.findById(userId);
    if (!user) {
      throw new CustomError("User not found", 404);
    }

    if (!(await user.comparePassword(oldPassword))) {
      throw new CustomError("Invalid old password", 401);
    }

    user.password = newPassword;
    await user.save();
  }
}

export default new AuthService();
