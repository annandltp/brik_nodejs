const knex = require("../config/database");
/**
 * Get list of products
 */
async function getProductList(req, res) {
  try {
    const data = await knex("products");
    return res.json({ data });
  } catch (e) {
    return res.status(500).json({
      error: {
        code: 500,
        message: e.message,
      },
    });
  }
}

async function getSearchProductList(req, res) {
  try {
    const { name, currentPage = 2, itemsPerPage = 10 } = req.query;

    // Convert currentPage and itemsPerPage to integers
    const currentPageInt = parseInt(currentPage);
    const itemsPerPageInt = parseInt(itemsPerPage);

    // Ensure currentPage and itemsPerPage are positive integers
    if (
      isNaN(currentPageInt) ||
      isNaN(itemsPerPageInt) ||
      currentPageInt <= 0 ||
      itemsPerPageInt <= 0
    ) {
      return res.status(400).json({
        error: {
          code: 400,
          message: "Invalid currentPage or itemsPerPage values.",
        },
      });
    }

    // Calculate startIndex based on currentPage and itemsPerPage
    const startIndex = (currentPageInt - 1) * itemsPerPageInt;

    // Construct the query based on the provided parameters
    let query = knex("products");

    if (name) {
      query = query.where("name", "like", `%${name}%`);
    }

    const totalCount = await query.clone().count("* as total").first();
    const totalItems = parseInt(totalCount.total);

    query = query.limit(itemsPerPageInt).offset(startIndex);

    const data = await query;

    return res.json({
      data,
      totalItems,
      currentPage: currentPageInt,
      itemsPerPage: itemsPerPageInt,
    });
  } catch (e) {
    return res.status(500).json({
      error: {
        code: 500,
        message: e.message,
      },
    });
  }
}

/**
 * Get detailed products info
 */
async function getProductDetail(req, res) {
  try {
    const id = req.params.id;
    const [data] = await knex("products").where("id", id);

    if (data) {
      return res.json({ data });
    }

    return res.status(404).json({
      error: {
        code: 404,
        message: "Product not found !",
      },
    });
  } catch (e) {
    return res.status(500).json({
      error: {
        code: 500,
        message: e.message,
      },
    });
  }
}

async function postProduct(req, res) {
  try {
    // Extract data from the request body
    const {
      name,
      categoryId,
      categoryName,
      sku,
      description,
      price,
      weight,
      width,
      length,
      height,
      image,
    } = req.body;

    // Perform validation on the incoming data if needed

    // Insert the new products into the 'products' table
    const [productId] = await knex("products").insert({
      name,
      categoryId,
      categoryName,
      description,
      sku,
      price,
      weight,
      width,
      length,
      height,
      image,
    });

    // Respond with a success message and the ID of the newly created products
    res.json({
      message: "Product created successfully",
      productId,
    });
  } catch (error) {
    console.error("Error creating products:", error.sqlMessage);
    res.status(500).json({
      error: {
        code: 500,
        message: error.sqlMessage,
      },
    });
  }
}

module.exports = {
  getProductList,
  getProductDetail,
  postProduct,
  getSearchProductList,
};
