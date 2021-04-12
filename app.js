require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const mongoose = require('mongoose');
const { errors } = require('celebrate');
const { login, createUser } = require('./controllers/users');
const auth = require('./middlewares/auth');
const { errorHandler } = require('./middlewares/error-handler');
const { validateSignIn, validateSignOut } = require('./middlewares/validators');
const { requestLogger, errorLogger } = require('./middlewares/logger');

const router = require('./routes');

const { PORT = 3000 } = process.env.PORT;

const app = express();

app.use(cors({
  origin: 'https://ruslanbelyi.students.nomoredomains.icu',
  optionsSuccessStatus: 200,
}));
app.use(helmet());

app.use(requestLogger);

mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
});

app.use(express.json());

app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});

app.post('/signin', validateSignIn, login);

app.post('/signup', validateSignOut, createUser);

app.use(auth);

app.use(router);

app.use(errorLogger);

app.use(errors());

app.use(errorHandler);

app.listen(PORT);
