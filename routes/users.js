const router = require('express').Router();
const {
  validateGetUsers,
  validateGetLoggedInUser,
  validateGetUserById,
  validateUpdateUser,
  validateUpdateAvatar,
} = require('../middlewares/validators');

const {
  getUsers,
  getUserById,
  getLoggedInUser,
  updateUser,
  updateAvatar,
} = require('../controllers/users');

router.get('/', validateGetUsers, getUsers);

router.get('/me', validateGetLoggedInUser, getLoggedInUser);

router.get('/:userId', validateGetUserById, getUserById);

router.patch('/me', validateUpdateUser, updateUser);

router.patch('/me/avatar', validateUpdateAvatar, updateAvatar);

module.exports = router;
