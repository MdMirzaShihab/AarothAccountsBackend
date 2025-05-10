/**
 * Validation middleware for category-related requests
 */
const { body, param, validationResult } = require('express-validator');
const sanitizeInput = require('../utils/sanitizeInput');

/**
 * Processes validation errors and formats response
 */
const validateRequest = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ 
      success: false, 
      message: 'Validation failed',
      errors: errors.array().map(err => ({ field: err.param, message: err.msg }))
    });
  }
  next();
};

/**
 * Validates creation and update of categories
 */
const validateCategoryData = [
  body('type')
    .trim()
    .notEmpty().withMessage('Category type is required')
    .isIn(['credit', 'debit']).withMessage('Type must be either credit or debit')
    .customSanitizer(sanitizeInput),
  
  body('name')
    .trim()
    .notEmpty().withMessage('Category name is required')
    .isLength({ min: 2, max: 50 }).withMessage('Name must be between 2 and 50 characters')
    .customSanitizer(sanitizeInput),
  
  validateRequest
];

/**
 * Validates category ID parameter
 */
const validateCategoryId = [
  param('id')
    .isMongoId().withMessage('Invalid category ID format'),
  
  validateRequest
];

/**
 * Validates category type parameter
 */
const validateCategoryType = [
  param('type')
    .trim()
    .notEmpty().withMessage('Category type is required')
    .isIn(['credit', 'debit']).withMessage('Type must be either credit or debit')
    .customSanitizer(sanitizeInput),
  
  validateRequest
];

module.exports = {
  validateCategoryData,
  validateCategoryId,
  validateCategoryType
};