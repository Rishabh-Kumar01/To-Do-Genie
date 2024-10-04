import authService from "../services/auth.service.js";

class AuthController {
  async register(req, res, next) {
    try {
      const { user, accessToken, refreshToken } = await authService.register(
        req.body
      );
      res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
      });
      res.status(201).json({ user, accessToken });
    } catch (error) {
      next(error);
    }
  }

  async login(req, res, next) {
    try {
      const { username, password } = req.body;
      const { user, accessToken, refreshToken } = await authService.login(
        username,
        password
      );
      res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
      });
      res.json({ user, accessToken });
    } catch (error) {
      next(error);
    }
  }

  async logout(req, res, next) {
    try {
      await authService.logout(req.user._id);
      res.clearCookie("refreshToken");
      res.json({ message: "Logged out successfully" });
    } catch (error) {
      next(error);
    }
  }

  async refreshToken(req, res, next) {
    try {
      const refreshToken = req.cookies.refreshToken;
      const { accessToken } = await authService.refreshToken(refreshToken);
      res.json({ accessToken });
    } catch (error) {
      next(error);
    }
  }

  async changePassword(req, res, next) {
    try {
      const { oldPassword, newPassword } = req.body;
      await authService.changePassword(req.user._id, oldPassword, newPassword);
      res.json({ message: "Password changed successfully" });
    } catch (error) {
      next(error);
    }
  }
}

export default new AuthController();
