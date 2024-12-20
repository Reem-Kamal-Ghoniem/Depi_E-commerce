const express = require("express");
const router = express.Router();

const {
  getAllBrands,
  getBrandsByCategory,
  getBrand,
  createBrand,
  updateBrand,
  deleteBrand
} = require("../controllers/brandController");

router.route("/").get(getAllBrands);
router.route("/category/:categoryId").get(getBrandsByCategory);
router.route("/:id").get(getBrand);
router.route("/").post(createBrand);
router.route("/:id").put(updateBrand);
router.route("/:id").delete(deleteBrand);

module.exports = router;