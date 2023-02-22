/* Импорты */
const rateLimit = require('express-rate-limit'); // Пакет лимитера запросов
/* env */
require('dotenv').config();
// обращение к файлу .env
const { NODE_ENV } = process.env;

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // за 15 минут
  max: NODE_ENV === 'production' ? 100 : 9999, // можно совершить максимум 100 запросов с одного IP
});

const createAccountLimiter = rateLimit({ // лимит на создание пользователей
  windowMs: 30 * 60 * 1000, // 30 минут
  max: NODE_ENV === 'production' ? 10 : 9999, // максимум 10, если не в продакшене то ограничение в 9999
  message:
    'Too many request',
  standardHeaders: true, // Стандартные заголовки
  legacyHeaders: false, // Легаси заголовки
});

/* Эскпорты */
module.exports = { limiter, createAccountLimiter };
