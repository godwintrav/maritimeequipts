const { Router } = require('express');
const authController = require('../controllers/authController');

const router = Router();

router.post("/register", authController.signup_post);
router.post("/login", authController.login_post);

module.exports = router;