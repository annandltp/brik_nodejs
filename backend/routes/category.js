const express = require('express');
const productHandler = require('../handlers/category');

const router = express.Router();

// category
router.get('/', productHandler.getCategoryList);

router.get('*', (req, res) => {
  res.json({ message: '404 Not Found' });
});

module.exports = router;