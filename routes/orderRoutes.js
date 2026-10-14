const express = require('express');
const router = express.Router();
const {
  getAllOrders,
  getCreateOrder,
  postCreateOrder,
  getUpdateOrder,
  postUpdateOrder,
  deleteOrder,
} = require('../controllers/orderController');

router.get(['/', ''], getAllOrders);
router.get('/create', getCreateOrder);
router.post('/create', postCreateOrder);
router.get('/:id/update', getUpdateOrder);
router.post('/:id/update', postUpdateOrder);
router.post('/:id/delete', deleteOrder);

module.exports = router;
