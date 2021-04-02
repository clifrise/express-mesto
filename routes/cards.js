const router = require('express').Router();
const {
  validateGetCards,
  validateCreateCard,
  validateDeleteCard,
  validateAddLike,
  validateRemoveLike,
} = require('../middlewares/validators');

const {
  getCards,
  createCard,
  deleteCard,
  addLike,
  removeLike,
} = require('../controllers/cards');

router.get('/', validateGetCards, getCards);

router.post('/', validateCreateCard, createCard);

router.delete('/:cardId', validateDeleteCard, deleteCard);

router.put('/:cardId/likes', validateAddLike, addLike);

router.delete('/:cardId/likes', validateRemoveLike, removeLike);

module.exports = router;
