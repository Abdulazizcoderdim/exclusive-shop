const productModel = require('../models/product.model');
const fileService = require('./file.service');

class ProductService {
  async getAll() {
    const products = await productModel.find();
    return products;
  }

  async createProduct(
    product,
    picture,
    picture2,
    picture3,
    picture4,
    picture5
  ) {
    const fileName = fileService.save(picture);
    const fileName2 = fileService.save(picture2);
    const fileName3 = fileService.save(picture3);
    const fileName4 = fileService.save(picture4);
    const fileName5 = fileService.save(picture5);
    
    const newProduct = await productModel.create({
      ...product,
      imageUrl: fileName,
      imageUrl2: fileName2,
      imageUrl3: fileName3,
      imageUrl4: fileName4,
      imageUrl5: fileName5,
    });
    return newProduct;
  }
  async getOne(id) {
    if (!id) {
      throw new Error('id is required');
    }
    const product = await productModel.findById(id);
    return product;
  }
  async deleteProduct(id) {
    if (!id) {
      throw new Error('id is required');
    }
    const deletedProduct = await productModel.findByIdAndDelete(id);
    return deletedProduct;
  }
  async editProduct(id, product) {
    if (!id) {
      throw new Error('id is required');
    }
    const editProduct = await productModel.findByIdAndUpdate(id, product, {
      new: true,
    });
    return editProduct;
  }
}

module.exports = new ProductService();
