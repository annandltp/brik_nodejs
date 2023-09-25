const knex = require('../config/database');

/**
 * Get list of categories
 */
async function getCategoryList(req, res) {
  try {
    const data = await knex('categories');
    return res.json({ data });
  } catch (e) {
    return res
      .status(500)
      .json({
        error: {
          code: 500,
          message: e.message,
        }
      });
  }
}

module.exports = {
  getCategoryList,
};