const { body } = require('express-validator')

const userValidationRules = () => [
  body('email').not().isEmpty().withMessage('Email cannot be empty'),
  body('password')
    .isLength({ min: 8 })
    .withMessage('Password must be at least 8 characters long')
    .matches(/\d/)
    .withMessage('Password must contain at least 1 digit')
    .matches(/[a-z]/)
    .withMessage('Password must contain at least 1 lowercase letter')
    .matches(/[A-Z]/)
    .withMessage('Password must contain at least 1 uppercase letter')
    .matches(/[\W_]/)
    .withMessage('Password must contain at least 1 special character')
    .not()
    .isIn(['123456', 'password', 'qwerty', 'abc123', '123456789', '111111'])
    .withMessage('Commonly used passwords are not allowed')
    .trim(),
  body('password', 'confirmPassword').custom((value, { req }) => {
    if (value === req.body.email) {
      throw new Error('Username and password cannot be the same')
    }
    return true
  }),
  body('confirmPassword')
    .notEmpty()
    .withMessage('Confirm Password field is required')
    .custom((value, { req }) => {
      if (value !== req.body.password) {
        throw new Error('Passwords do not match')
      }
      return true
    }),

  body('firstname').notEmpty().withMessage('First Name field is required'),
  body('lastname').notEmpty().withMessage('Last Name field is required'),
  body('age').custom((value, { req }) => {
    if (value < 18) {
      throw new Error('Age must be 18 or older')
    }
    return true
  }),
]

module.exports = userValidationRules
