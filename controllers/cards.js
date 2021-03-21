const Card = require('../models/card');

const getCards = (req, res) => {
  Card.find()
    .populate('owner')
    .populate('likes')
    .then((cards) => res.send({ data: cards }))
    .catch((err) => res.status(500).send({ message: err.message }));
};

const createCard = (req, res) => {
  const { name, link } = req.body;
  Card.create({ name, link, owner: req.user._id })
    .then((card) => {
      res.status(201).send({ data: card });
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(400).send({
          message: err.message,
        });
      } else {
        res.status(500).send({ message: err.message });
      }
    });
};

const deleteCard = (req, res) => {
  Card.findByIdAndRemove(req.params.cardId)
    .then((card) => {
      if (!card) {
        res
          .status(404)
          .send({ message: 'Карточка с указанным _id не найдена' });
      } else {
        res.send({ meddage: 'Пост удален' });
      }
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(400).send({
          message: err.message,
        });
      } else {
        res.status(500).send({ message: err.message });
      }
    });
};

const addLike = (req, res) => {
  const { cardId } = req.params;
  Card.findByIdAndUpdate(
    cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .populate('owner')
    .populate('likes')
    .then((card) => {
      if (!card) {
        res
          .status(404)
          .send({ message: 'Карточка с указанным _id не найдена' });
      } else {
        res.send({ data: card });
      }
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(400).send({
          message: err.message,
        });
      } else {
        res.status(500).send({ message: err.message });
      }
    });
};

const removeLike = (req, res) => {
  const { cardId } = req.params;
  Card.findByIdAndUpdate(
    cardId,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .populate('owner')
    .populate('likes')
    .then((card) => {
      if (!card) {
        res
          .status(404)
          .send({ message: 'Карточка с указанным _id не найдена' });
      } else {
        res.send({ data: card });
      }
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(400).send({
          message: err.message,
        });
      } else {
        res.status(500).send({ message: err.message });
      }
    });
};

module.exports = {
  getCards,
  createCard,
  deleteCard,
  addLike,
  removeLike,
};
