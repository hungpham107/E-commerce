import express from "express";
import {
  createUser,
  loginUser,
  logoutUser,
  getAllUsers,
  getProfile,
  updaterProfile,
  deleteUserbyId,
  getUserById,
  updateUserById,
} from "../controllers/userController.js";
import { authenticate, authorizeAdmin } from "../middlewares/authMiddleware.js";

const router = express.Router();

router
  .route("/")
  .post(createUser)
  .get(authenticate, authorizeAdmin, getAllUsers);

//localhost:5000/api/users/auth
router.post("/auth", loginUser);
router.post("/logout", logoutUser);
router
  .route("/profile")
  .get(authenticate, getProfile)
  .put(authenticate, updaterProfile);
//admin routes
router
  .route("/:id")
  .delete(authenticate, authorizeAdmin, deleteUserbyId)
  .get(authenticate, authorizeAdmin, getUserById)
  .put(authenticate, authorizeAdmin, updateUserById);
export default router;
