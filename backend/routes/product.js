const express = require("express");
const productHandler = require("../handlers/product");

const router = express.Router();

// product
router.get("/", productHandler.getProductList);
router.get("/search", productHandler.getSearchProductList);
router.post("/", productHandler.postProduct);
router.get("/:id", productHandler.getProductDetail);

router.get("*", (req, res) => {
  res.json({ message: "404 Not Found" });
});

module.exports = router;
