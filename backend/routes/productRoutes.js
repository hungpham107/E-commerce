import express from "express";
import formidable from "express-formidable";
const router = express.Router();
import {
  addProduct,
  updateProduct,
  removeProduct,
  getProducts,
  getProductById,
  getAllProducts,
  addProductReview,
  getTopProducts,
  // getNewProducts,
  filterProducts,
} from "../controllers/productController.js";
import { authenticate, authorizeAdmin } from "../middlewares/authMiddleware.js";

router
  .route("/")
  .get(getProducts)
  .post(authenticate, authorizeAdmin, formidable(), addProduct);
router.route("/allproducts").get(getAllProducts);
router.route("/:id/reviews").post(authenticate, addProductReview);
router.get("/top", getTopProducts);
// router.get("/new", getNewProducts);
router
  .route("/:id")
  .get(getProductById)
  .put(authenticate, authorizeAdmin, formidable(), updateProduct)
  .delete(authenticate, authorizeAdmin, removeProduct);
router.route("/filtered-products").post(filterProducts);
export default router;
