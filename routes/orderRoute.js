const { Router } = require('express');
const orderController = require('../controllers/orderController');

const router = Router();

router.post("/save-order", orderController.save_products);
router.get("/send-order", orderController.send_email_order);

module.exports = router;