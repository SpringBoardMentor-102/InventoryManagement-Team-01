const express = require('express');
const router = express.Router();
const checkoutController = require('../controllers/checkoutController');

router.post('/addcheckout', checkoutController.addCheckout);
router.get('/getcheckouts', checkoutController.getCheckouts);
router.get('/getcheckouts/:user_id', checkoutController.getCheckoutByUserId);
router.get('/getcheckout/:id', checkoutController.getCheckoutById);
router.put('/updatecheckout/:id', checkoutController.updateCheckout);
router.delete('/deletecheckout/:id', checkoutController.deleteCheckout);

module.exports = router;
