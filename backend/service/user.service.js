const userModel = require('../models/user.model');

class UserService {
  async favorite(userId, productId) {
    const user = await userModel.findById(userId);

    if (!user) {
      throw new Error('User not found');
    }

    if (!user.favoriteProducts.includes(productId)) {
      user.favoriteProducts.push(productId);
      await user.save();
      return user;
    } else {
      throw new Error('Product already in favorites');
    }
  }
  async view(userId, productId) {
    const user = await userModel.findById(userId);
    if (!user) {
      throw new Error('User not found');
    }

    if (!user.viewedProducts.includes(productId)) {
      user.viewedProducts.push(productId);
      await user.save();
      return user;
    } else {
      throw new Error('Product already in viewed');
    }
  }

  async unfavorite(userId, productId) {
    const user = await userModel.findById(userId);
    if (!user) {
      throw new Error('User not found');
    }
    user.favoriteProducts = user.favoriteProducts.filter(
      favoriteId => favoriteId.toString() !== productId
    );
    await user.save();

    return user;
  }

  async getUser(userId) {
    const user = await userModel.findById(userId);
    if (!user) {
      throw new Error('User not found');
    }
    return user;
  }

  async unview(userId, productId) {
    const user = await userModel.findById(userId);
    if (!user) {
      throw new Error('User not found');
    }

    user.viewedProducts = user.viewedProducts.filter(
      viewId => viewId.toString() !== productId
    );

    await user.save();
    return user;
  }

  async makeAdmin(id) {
    const user = await userModel.findById(id);
    if (!user) {
      throw new Error('User not found');
    }
    user.role = 'admin';
    await user.save();
    return user;
  }
}

module.exports = new UserService();
