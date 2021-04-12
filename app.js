const express = require('express');
const mongoose = require('mongoose');
const { errors } = require('celebrate');
const { login, createUser } = require('./controllers/users');
const auth = require('./middlewares/auth');
const { errorHandler } = require('./middlewares/error-handler');
const { validateSignIn, validateSignOut } = require('./middlewares/validators');
const { requestLogger, errorLogger } = require('./middlewares/logger');

const router = require('./routes');

const { PORT = 3000 } = process.env;

const app = express();

app.use(requestLogger);

mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
});

app.use(express.json());

app.post('/signin', validateSignIn, login);

app.post('/signup', validateSignOut, createUser);

app.use(auth);

app.use(router);

app.use(errorLogger);

app.use(errors());

app.use(errorHandler);

app.listen(PORT);
