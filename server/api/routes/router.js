const express = require('express');
const router = express.Router();
// Import user controller
const userController = require("../controllers/user.controllers");
// Contact routes
router.post('/login', userController.login);
router.post('/register', userController.registration);
// Export API routes
module.exports = router;