import express from "express";
import { createUser, deleteUserById, getAllUsers, getUser, getUserById } 
from "../controllers/userController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();
router.post("/create-user", createUser);
router.get("/get-user",protect, getUser );
router.get("/user-id", protect, getUserById);
router.get("/all-user",protect, getAllUsers);
router.delete("/delete-user",protect, deleteUserById);

export default router;