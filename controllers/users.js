const bcrypt = require('bcryptjs');
const validator = require('validator');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const NotFoundError = require('../errors/not-found-err');
const BadRequestError = require('../errors/bad-reques-err');
const ConflictError = require('../errors/conflict-err');

const getUsers = (req, res, next) => {
  User.find()
    .then((users) => res.send({ data: users }))
    .catch(next);
};

const getUserById = (req, res, next) => {
  User.findById(req.params.userId)
    .then((user) => {
      if (!user) {
        throw new NotFoundError('Пользователь с указанным _id не найден');
      } else {
        res.send({ data: user });
      }
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequestError('Невалидный id'));
      } else {
        next(err);
      }
    });
};

const getLoggedInUser = (req, res, next) => {
  User.findOne({ _id: req.user._id })
    .then((user) => {
      if (!user) {
        throw new NotFoundError('Пользователь с указанным _id не найден');
      } else {
        res.send({ data: user });
      }
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequestError('Невалидный id'));
      } else {
        next(err);
      }
    });
};

const createUser = (req, res, next) => {
  const {
    name,
    about,
    avatar,
    email,
    password,
  } = req.body;
  try {
    if (!validator.isEmail(email)) {
      throw new BadRequestError('Неверный формат электронной почты');
    }
  } catch (err) {
    next(err);
  }
  bcrypt.hash(password, 10).then((hash) => {
    const userBluprint = {
      name,
      about,
      avatar,
      email,
      password: hash,
    };
    const resultBluprint = {};
    Object.keys(userBluprint).forEach((key) => {
      if (userBluprint[key]) {
        resultBluprint[key] = userBluprint[key];
      }
    });
    User.create(resultBluprint)
      .then((user) => res.status(201).send({ data: user.toJSON() }))
      .catch((err) => {
        if (err.name === 'ValidationError') {
          next(new BadRequestError('Неверено задано одно из полей'));
        } else if (err.name === 'MongoError' && err.code === 11000) {
          next(new ConflictError('Пользователь с указанной почтой уже существует в базе данных'));
        } else {
          next(err);
        }
      });
  });
};

const updateUser = (req, res, next) => {
  const { name, about } = req.body;
  User.findByIdAndUpdate(req.user._id, { name, about }, { new: true })
    .then((user) => {
      if (!user) {
        throw new NotFoundError('Пользователь с указанным _id не найден');
      } else {
        res.send({ data: user });
      }
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestError('Неверено задано одно из полей'));
      } else if (err.name === 'CastError') {
        next(new BadRequestError('Невалидный id'));
      } else {
        next(err);
      }
    });
};

const updateAvatar = (req, res, next) => {
  const { avatar } = req.body;
  User.findByIdAndUpdate(req.user._id, { avatar }, { new: true, runValidators: true })
    .then((user) => {
      if (!user) {
        throw new NotFoundError('Пользователь с указанным _id не найден');
      } else {
        res.send({ data: user });
      }
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestError('Неверено задано одно из полей'));
      } else if (err.name === 'CastError') {
        next(new BadRequestError('Невалидный id'));
      } else {
        next(err);
      }
    });
};

const login = (req, res, next) => {
  const { email, password } = req.body;
  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign(
        { _id: user._id },
        '5e3d71805bebf95279360f870bba241a814ecccb7b7971a49ecf4b939c3f4e2f',
      );
      res
        .cookie('jwt', token, {
          maxAge: 3600000 * 24 * 7,
          httpOnly: true,
        })
        .end();
    })
    .catch((err) => {
      next(err);
    });
};

module.exports = {
  getUsers,
  getUserById,
  getLoggedInUser,
  createUser,
  updateUser,
  updateAvatar,
  login,
};
