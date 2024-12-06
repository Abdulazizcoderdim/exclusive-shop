const express = require('express');
const userController = require('../controller/user.controller');
const authMiddleware = require('../middleware/auth.middleware');

const router = express.Router();

router.post('/:userId/favorite', authMiddleware, userController.favorite);
router.post('/:userId/unfavorite', userController.unfavorite);
router.get('/:userId', userController.getUser);
router.post('/:userId/view', authMiddleware, userController.view);
router.post('/:userId/unview', userController.unview);
// make admin
router.put('/:id/make-admin', authMiddleware, userController.makeAdmin);

module.exports = router;
