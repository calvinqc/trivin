// To-do Need to change to bcrypt
import sha256 from 'sha256';
import { check } from 'express-validator';

import {
  PASSWORD_IS_EMPTY,
  PASSWORD_LENGTH_MUST_BE_MORE_THAN_8,
  EMAIL_IS_EMPTY,
  EMAIL_IS_IN_WRONG_FORMAT,
} from './constant';

export const generateHashedPassword = password => sha256(password);

export function generateServerErrorCode(
  res,
  code,
  fullError,
  msg,
  location = 'server'
) {
  const errors = {};
  errors[location] = {
    fullError,
    msg,
  };

  return res.status(code).json({
    code,
    fullError,
    errors,
  });
}
// ================================
// Validation:
// Handle all validation check for the server
// ================================

export const registerValidation = [
  check('email')
    .exists()
    .withMessage(EMAIL_IS_EMPTY)
    .isEmail()
    .withMessage(EMAIL_IS_IN_WRONG_FORMAT),
  check('password')
    .exists()
    .withMessage(PASSWORD_IS_EMPTY)
    .isLength({ min: 8 })
    .withMessage(PASSWORD_LENGTH_MUST_BE_MORE_THAN_8),
];

export const loginValidation = [
  check('email')
    .exists()
    .withMessage(EMAIL_IS_EMPTY)
    .isEmail()
    .withMessage(EMAIL_IS_IN_WRONG_FORMAT),
  check('password')
    .exists()
    .withMessage(PASSWORD_IS_EMPTY)
    .isLength({ min: 8 })
    .withMessage(PASSWORD_LENGTH_MUST_BE_MORE_THAN_8),
];
