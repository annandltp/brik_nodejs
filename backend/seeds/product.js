const knex = require("../config/database");

/**
 * DO NOT CHANGE / DELETE
 *
 * Handler for resetting product table data,
 * it will be called on each Run Test / Submit.
 */
async function postRunSeed(req, res) {
  try {
    await knex("products").truncate();
    await knex("categories").truncate();

    const dummyData = [];
    const dummyCategoryData = [];

    for (let i = 1; i <= 100; i++) {
      const data = {
        CategoryId: 1, // Replace with the actual category ID
        categoryName: "electronic",
        sku: `SKU${i}`,
        name: `Product ${i}`,
        description: `Dummy data for product ${i}`,
        weight: Math.floor(Math.random() * 1000) + 1, // Adjust the range as needed
        width: Math.floor(Math.random() * 100) + 1, // Adjust the range as needed
        length: Math.floor(Math.random() * 100) + 1, // Adjust the range as needed
        height: Math.floor(Math.random() * 100) + 1, // Adjust the range as needed
        image: "product_image_url", // Replace with an actual image URL
        price: Math.floor(Math.random() * 1000000) + 1,
      };

      dummyData.push(data);
    }

    for (let i = 1; i <= 5; i++) {
      const data = {
        id: i,
        categoryName: `Category ${i}`,
        // Add more user fields as needed
      };

      dummyCategoryData.push(data);
    }

    await knex("products").insert(dummyData);
    await knex("categories").insert(dummyCategoryData);

    return res.json({ message: "Seeder Finished" });
  } catch (e) {
    return res.status(500).json({
      error: {
        code: 500,
        message: e.message,
      },
    });
  }
}

module.exports = { postRunSeed };
