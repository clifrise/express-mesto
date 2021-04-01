const validator = require('validator');
const { celebrate, Joi } = require('celebrate');
const router = require('express').Router();

const {
  getUsers,
  getUserById,
  getLoggedInUser,
  updateUser,
  updateAvatar,
} = require('../controllers/users');

router.get('/', celebrate({
  headers: Joi.object().keys({
    'content-type': Joi.string().valid('application/json').required().messages({
      'string.valid': 'Поле {#label} должно иметь значение application/json!',
      'string.required': '{#label} обязательное поле!',
    }),
    authorization: Joi.string().max(200).required().messages({
      'string.max': 'Поле {#label} должно быть не больше {#limit} символов!',
      'string.required': '{#label} обязательное поле!',
    }),
  }).unknown(),
}), getUsers);

router.get('/me', celebrate({
  headers: Joi.object().keys({
    'content-type': Joi.string().valid('application/json').required().messages({
      'string.valid': 'Поле {#label} должно иметь значение application/json!',
      'string.required': '{#label} обязательное поле!',
    }),
    authorization: Joi.string().max(200).required().messages({
      'string.max': 'Поле {#label} должно быть не больше {#limit} символов!',
      'string.required': '{#label} обязательное поле!',
    }),
  }).unknown(),
}), getLoggedInUser);

router.get('/:userId', celebrate({
  params: Joi.object().keys({
    userId: Joi.string().alphanum().length(24).messages({
      'string.alphanum': 'Поле {#label} должно содержать только буквы и цифры!',
      'string.length': 'Поле {#label} должно быть длиной 24 символа!',
    }),
  }),
  headers: Joi.object().keys({
    'content-type': Joi.string().valid('application/json').required().messages({
      'string.valid': 'Поле {#label} должно иметь значение application/json!',
      'string.required': '{#label} обязательное поле!',
    }),
    authorization: Joi.string().max(200).required().messages({
      'string.max': 'Поле {#label} должно быть не больше {#limit} символов!',
      'string.required': '{#label} обязательное поле!',
    }),
  }).unknown(),
}), getUserById);

router.patch('/me', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30).messages({
      'string.min': 'Поле {#label} должно быть не меньше {#limit} символов!',
      'string.max': 'Поле {#label} должно быть не больше {#limit} символов!',
    }),
    about: Joi.string().min(2).max(30).messages({
      'string.min': 'Поле {#label} должно быть не меньше {#limit} символов!',
      'string.max': 'Поле {#label} должно быть не больше {#limit} символов!',
    }),
  }),
  headers: Joi.object().keys({
    'content-type': Joi.string().valid('application/json').required().messages({
      'string.valid': 'Поле {#label} должно иметь значение application/json!',
      'string.required': '{#label} обязательное поле!',
    }),
    authorization: Joi.string().max(200).required().messages({
      'string.max': 'Поле {#label} должно быть не больше {#limit} символов!',
      'string.required': '{#label} обязательное поле!',
    }),
  }).unknown(),
}), updateUser);

router.patch('/me/avatar', celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().custom((value, helpers) => {
      if (validator.isURL(value)) {
        return value;
      }
      return helpers.message('Поле "avatar" должно быть валидным url-адресом');
    })
      .messages({
        'any.required': 'Поле "avatar" должно быть заполнено',
      }),
  }),
  headers: Joi.object().keys({
    'content-type': Joi.string().valid('application/json').required().messages({
      'string.valid': 'Поле {#label} должно иметь значение application/json!',
      'string.required': '{#label} обязательное поле!',
    }),
    authorization: Joi.string().max(200).required().messages({
      'string.max': 'Поле {#label} должно быть не больше {#limit} символов!',
      'string.required': '{#label} обязательное поле!',
    }),
  }).unknown(),
}), updateAvatar);

module.exports = router;
