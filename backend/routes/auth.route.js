const express = require('express');
const authController = require('../controller/auth.controller');
const { body } = require('express-validator');
const authMiddleware = require('../middleware/auth.middleware');
const passport = require('passport');

const router = express.Router();

router.post(
  '/register',
  body('email').isEmail().withMessage('Invalid email'),
  body('password')
    .isLength({ min: 6, max: 30 })
    .withMessage('Password must be between 6 and 30 characters'),
  authController.register
);
router.get('/activation/:id', authController.activation);
router.post(
  '/login',
  body('email').isEmail().withMessage('Invalid email'),
  body('password')
    .isLength({ min: 8, max: 30 })
    .withMessage('Password must be between 8 and 30 characters'),
  authController.login
);
router.post('/logout', authController.logout);
router.get('/refresh', authController.refresh);
router.get('/get-users', authMiddleware, authController.getUser);
router.put('/edit-user/:id', authController.editUser);
router.get(
  '/google',
  passport.authenticate('google', {
    successMessage: 'Login Successful',
    scope: ['profile', 'email'],
  })
);
router.get(
  '/google/callback',
  passport.authenticate('google', {
    successRedirect: `${process.env.CLIENT_URL}`,
    failureRedirect: `${process.env.CLIENT_URL}/login`,
  })
);

router.get('/login/success', async (req, res) => {
  console.log('reqqqqqqqqqqqqq', req.user);

  if (req.user) {
    res.status(200).json({ message: 'User Login', user: req.user });
  } else {
    res.status(400).json({ message: 'Not Authorized' });
  }
});

router.get('/logout', (req, res) => {
  req.logout();
  res.redirect('/login');
});

module.exports = router;
