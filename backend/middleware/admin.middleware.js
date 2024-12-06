module.exports = function (req, res, next) {
  const token = req.headers.authorization.split(' ')[1];
  const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

  if (decodedToken.role !== 'admin') {
    return res
      .status(403)
      .json({ message: 'Access denied, only admins can create products' });
  }

  next();
};
