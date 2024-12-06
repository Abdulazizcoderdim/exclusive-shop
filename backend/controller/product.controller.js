const productService = require('../service/product.service');

class ProductController {
  async getAll(req, res, next) {
    try {
      const allProducts = await productService.getAll();
      res.status(200).json(allProducts);
    } catch (error) {
      next(error);
    }
  }

  async createProduct(req, res, next) {
    try {
      const newProduct = await productService.createProduct(
        req.body,
        req.files.picture,
        req.files.picture2,
        req.files.picture3,
        req.files.picture4,
        req.files.picture5
      );
      res.status(201).json(newProduct);
    } catch (error) {
      next(error);
    }
  }
  async getOne(req, res, next) {
    try {
      const product = await productService.getOne(req.params.id);
      res.status(200).json(product);
    } catch (error) {
      next(error);
    }
  }
  async deleteProduct(req, res, next) {
    try {
      const deletedProduct = await productService.deleteProduct(req.params.id);
      res.status(200).json(deletedProduct);
    } catch (error) {
      next(error);
    }
  }
  async editProduct(req, res, next) {
    try {
      const editProduct = await productService.editProduct(
        req.params.id,
        req.body
      );
      res.status(200).json(editProduct);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new ProductController();
