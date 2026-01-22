const express = require("express");
const userController = require("../controllers/userController");

const router = express.Router();

/**
 * Health Check Endpoint
 * GET /api/health
 */
router.get("/health", (req, res) => {
  res.json({ status: "ok", time: new Date().toISOString() });
});

/**
 * --------------------------------------------------------
 * User Management Routes
 * --------------------------------------------------------
 */

// GET /api/users - List all users
router.get("/users", (req, res) => userController.getAllUsers(req, res));

// GET /api/users/:id - Get specific user
router.get("/users/:id", (req, res) => userController.getUserById(req, res));

// POST /api/users - Create new user
router.post("/users", (req, res) => userController.createUser(req, res));

// DELETE /api/users/:id - Remove user
router.delete("/users/:id", (req, res) => userController.deleteUser(req, res));

module.exports = { router };
