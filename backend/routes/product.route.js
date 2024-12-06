const express = require('express');
const productController = require('../controller/product.controller');
const adminMiddleware = require('../middleware/admin.middleware');

const router = express.Router();

router.get('/get-products', productController.getAll);
router.get('/get-product/:id', productController.getOne);
router.post('/create-product', productController.createProduct);
router.delete('/delete-product/:id', productController.deleteProduct);
router.put('/edit-product/:id', productController.editProduct);

module.exports = router;
