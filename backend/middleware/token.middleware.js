const jwt = require('jsonwebtoken');
module.exports = function (req, res, next) {
  // So'rovning "Authorization" headerida tokenni olamiz
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // Bearer <token> shaklida bo'ladi

  if (!token) {
    return res
      .status(401)
      .json({ message: 'Token topilmadi, kirish rad etildi' });
  }

  // Tokenni tekshiramiz
  jwt.verify(token, process.env.JWT_ACCESS_KEY, (err, user) => {
    if (err) {
      return res
        .status(403)
        .json({ message: 'Token yaroqsiz yoki muddati tugagan' });
    }

    // Tekshirish muvaffaqiyatli bo'lsa, foydalanuvchi ma'lumotlarini so'rovga qo'shamiz
    req.user = user;

    // Keyingi middlewarega o'tamiz
    next();
  });
};
