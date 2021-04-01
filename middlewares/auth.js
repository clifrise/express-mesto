const jwt = require('jsonwebtoken');
const Unauthorized = require('../errors/unauthorized-err');
const ForbiddenError = require('../errors/forbidden-err');

module.exports = (req, res, next) => {
  const { authorization } = req.headers;
  try {
    if (!authorization || !authorization.startsWith('Bearer ')) {
      throw new Unauthorized('Необходима авторизация');
    }
    let payload;
    const token = authorization.replace('Bearer ', '');
    try {
      payload = jwt.verify(token, '5e3d71805bebf95279360f870bba241a814ecccb7b7971a49ecf4b939c3f4e2f');
    } catch (err) {
      throw new ForbiddenError('Недостаточно прав для выполнения действия');
    }
    req.user = payload;
  } catch (err) {
    next(err);
  }
  next();
};
