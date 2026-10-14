const mongoose = require('mongoose');
require('dotenv').config();
const Product = require('./models/productModel');
const Order = require('./models/orderModel');

const products = [
  {
    productName: 'Wireless Mouse',
    category: 'Electronics',
    stockStatus: 'in_stock',
    unitPrice: 250000,
    tags: ['bestseller', 'wireless', 'accessory'],
  },
  {
    productName: 'Mechanical Keyboard',
    category: 'Electronics',
    stockStatus: 'in_stock',
    unitPrice: 800000,
    tags: ['keyboard', 'gaming'],
  },
];

const orders = [
  {
    customerName: 'Nguyen Thi Lan',
    productName: 'Wireless Mouse',
    quantity: 2,
    orderDate: new Date('2024-10-17'),
    totalPrice: 500000,
  },
  {
    customerName: 'Pham Van Duc',
    productName: 'Mechanical Keyboard',
    quantity: 1,
    orderDate: new Date('2024-10-18'),
    totalPrice: 800000,
  },
];

mongoose
  .connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/shop')
  .then(async () => {
    await Product.deleteMany({});
    await Order.deleteMany({});
    await Product.insertMany(products);
    await Order.insertMany(orders);
    console.log('Seed done!');
    process.exit(0);
  })
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });
