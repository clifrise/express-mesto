const { celebrate, Joi } = require('celebrate');
const router = require('express').Router();

const {
  getCards,
  createCard,
  deleteCard,
  addLike,
  removeLike,
} = require('../controllers/cards');

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
}), getCards);

router.post('/', celebrate({
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
}), createCard);

router.delete('/:cardId', celebrate({
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
}), deleteCard);

router.put('/:cardId/likes', celebrate({
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
}), addLike);

router.delete('/:cardId/likes', celebrate({
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
}), removeLike);

module.exports = router;
