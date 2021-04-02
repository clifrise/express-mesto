const { celebrate, Joi } = require('celebrate');
const validator = require('validator');

const validateSignIn = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().messages({
      'any.required': '{#label} обязательное поле!',
    }),
    password: Joi.string().required().min(6).messages({
      'string.min': 'Поле {#label} должно быть не меньше {#limit} символов!',
      'any.required': '{#label} обязательное поле!',
    }),
  }),
});

const validateSignOut = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30).messages({
      'string.min': 'Поле {#label} должно быть не меньше {#limit} символов!',
      'string.max': 'Поле {#label} должно быть не больше {#limit} символов!',
    }),
    about: Joi.string().min(2).max(30).messages({
      'string.min': 'Поле {#label} должно быть не меньше {#limit} символов!',
      'string.max': 'Поле {#label} должно быть не больше {#limit} символов!',
    }),
    avatar: Joi.string().custom((value, helpers) => {
      if (validator.isURL(value)) {
        return value;
      }
      return helpers.message('Поле "avatar" должно быть валидным url-адресом');
    })
      .messages({
        'any.required': 'Поле "avatar" должно быть заполнено',
      }),
    email: Joi.string().required().messages({
      'any.required': '{#label} обязательное поле!',
    }),
    password: Joi.string().required().min(6).messages({
      'string.min': 'Поле {#label} должно быть не меньше {#limit} символов!',
      'any.required': '{#label} обязательное поле!',
    }),
  }),
});

const validateGetUsers = celebrate({
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
});

const validateGetLoggedInUser = celebrate({
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
});

const validateGetUserById = celebrate({
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
});

const validateUpdateUser = celebrate({
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
});

const validateUpdateAvatar = celebrate({
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
});

const validateGetCards = celebrate({
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
});

const validateCreateCard = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30)
      .messages({
        'string.min': 'Поле {#label} должно быть не меньше {#limit} символов!',
        'string.max': 'Поле {#label} должно быть не больше {#limit} символов!',
        'string.required': '{#label} обязательное поле!',
      }),
    link: Joi.string().required().min(2).messages({
      'string.min': 'Поле {#label} должно быть не меньше {#limit} символов!',
      'string.required': '{#label} обязательное поле!',
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
});

const validateDeleteCard = celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().alphanum().length(24).messages({
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
});

const validateAddLike = celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().alphanum().length(24).messages({
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
});

const validateRemoveLike = celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().alphanum().length(24).messages({
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
});

module.exports = {
  validateSignIn,
  validateSignOut,
  validateGetUsers,
  validateGetLoggedInUser,
  validateGetUserById,
  validateUpdateUser,
  validateUpdateAvatar,
  validateGetCards,
  validateCreateCard,
  validateDeleteCard,
  validateAddLike,
  validateRemoveLike,
};
