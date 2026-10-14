const Order = require('../models/orderModel');
const Product = require('../models/productModel');

// GET /orders - Danh sach tat ca order
const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find();
    res.render('order', { orders });
  } catch (err) {
    res.status(500).send(err.message);
  }
};

// GET /orders/create - Hien thi form tao moi
const getCreateOrder = async (req, res) => {
  try {
    const products = await Product.find();
    res.render('createOrder', { products, error: null });
  } catch (err) {
    res.status(500).send(err.message);
  }
};

// POST /orders/create - Xu ly tao moi
const postCreateOrder = async (req, res) => {
  try {
    const { customerName, productName, quantity, orderDate } = req.body;

    // Validate: không cho phép ngày trong quá khứ
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const selectedDate = new Date(orderDate);
    if (selectedDate < today) {
      const products = await Product.find();
      return res.render('createOrder', {
        products,
        error: 'Order date cannot be in the past.',
      });
    }

    // Constraint: chi order san pham da ton tai trong he thong
    const product = await Product.findOne({ productName });
    if (!product) {
      const products = await Product.find();
      return res.render('createOrder', {
        products,
        error: 'Product does not exist in the system.',
      });
    }

    // Tu dong tinh totalPrice = quantity * unitPrice
    const totalPrice = product.unitPrice * Number(quantity);

    const newOrder = new Order({
      customerName,
      productName,
      quantity: Number(quantity),
      orderDate: new Date(orderDate),
      totalPrice,
    });

    await newOrder.save();
    res.redirect('/orders');
  } catch (err) {
    res.status(500).send(err.message);
  }
};

// GET /orders/:id/update - Hien thi form cap nhat
const getUpdateOrder = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) return res.status(404).send('Order not found');
    const products = await Product.find();
    res.render('updateOrder', { order, products, error: null });
  } catch (err) {
    res.status(500).send(err.message);
  }
};

// POST /orders/:id/update - Xu ly cap nhat
const postUpdateOrder = async (req, res) => {
  try {
    const { customerName, productName, quantity, orderDate } = req.body;

    // Validate: không cho phép ngày trong quá khứ
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const selectedDate = new Date(orderDate);
    if (selectedDate < today) {
      const order = await Order.findById(req.params.id);
      const products = await Product.find();
      return res.render('updateOrder', {
        order,
        products,
        error: 'Order date cannot be in the past.',
      });
    }

    const product = await Product.findOne({ productName });
    if (!product) {
      const order = await Order.findById(req.params.id);
      const products = await Product.find();
      return res.render('updateOrder', {
        order,
        products,
        error: 'Product does not exist in the system.',
      });
    }

    const totalPrice = product.unitPrice * Number(quantity);

    await Order.findByIdAndUpdate(req.params.id, {
      customerName,
      productName,
      quantity: Number(quantity),
      orderDate: new Date(orderDate),
      totalPrice,
    });

    res.redirect('/orders');
  } catch (err) {
    res.status(500).send(err.message);
  }
};

// POST /orders/:id/delete - Xoa order
const deleteOrder = async (req, res) => {
  try {
    await Order.findByIdAndDelete(req.params.id);
    res.redirect('/orders');
  } catch (err) {
    res.status(500).send(err.message);
  }
};

module.exports = {
  getAllOrders,
  getCreateOrder,
  postCreateOrder,
  getUpdateOrder,
  postUpdateOrder,
  deleteOrder,
};
