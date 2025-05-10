const express = require('express');
const router = express.Router();
const {
  createCategory,
  getCategories,
  updateCategory,
  deleteCategory,
  getCategoriesByType,
} = require('../controllers/categoryController');

router.post('/', createCategory);
router.get('/', getCategories); 
router.put('/:id', updateCategory); 
router.delete('/:id', deleteCategory); 
router.get('/type/:type', getCategoriesByType);

module.exports = router;