// empRoute.js
const express = require("express");
const router = express.Router();
const employeeController = require("../controllers/empController");

// Create a new employee
router.post("/", employeeController.createEmployee);

// Get all employees
router.get("/", employeeController.getAllEmployees);

// Update an employee
router.put("/:id", employeeController.updateEmployee);

// Delete an employee
router.delete("/:id", employeeController.deleteEmployee);

module.exports = router;
