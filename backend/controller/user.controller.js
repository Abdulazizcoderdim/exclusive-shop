const userService = require('../service/user.service');

class UserController {
  async favorite(req, res) {
    try {
      const { userId } = req.params;
      const { productId } = req.body;
      const user = await userService.favorite(userId, productId);
      return res.json(user);
    } catch (error) {
      res.status(500).json(error);
    }
  }

  async getUser(req, res) {
    try {
      const { userId } = req.params;
      const user = await userService.getUser(userId);
      return res.json(user);
    } catch (error) {
      res.status(500).json(error);
    }
  }

  async unfavorite(req, res) {
    try {
      const { userId } = req.params;
      const { productId } = req.body;
      const user = await userService.unfavorite(userId, productId);
      return res.json(user);
    } catch (error) {
      res.status(500).json(error);
    }
  }

  async view(req, res) {
    try {
      const { userId } = req.params;
      const { productId } = req.body;
      const user = await userService.view(userId, productId);
      return res.json(user);
    } catch (error) {
      res.status(500).json(error);
    }
  }
  async unview(req, res) {
    try {
      const { userId } = req.params;
      const { productId } = req.body;
      const user = await userService.unview(userId, productId);
      return res.json(user);
    } catch (error) {
      res.status(500).json(error);
    }
  }

  async makeAdmin(req, res) {
    try {
      const { id } = req.params;
      const user = await userService.makeAdmin(id);
      return res.json(user);
    } catch (error) {
      res.status(500).json({ error: 'Failed to update user role' });
    }
  }
}

module.exports = new UserController();
