const express = require('express');
const User = require('../models/user');
const Product = require('../models/product');
const router = express.Router();

// --- AUTH ---

// Реєстрація
router.post('/register', async (req, res) => {
  try {
    const user = new User(req.body);
    await user.save();
    res.status(201).send(user);
  } catch (e) {
    res.status(400).send({ error: 'Email already exists or invalid data' });
  }
});

// Логін (пошук по пошті та паролю)
router.post('/login', async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email, password: req.body.password });
    if (!user) {
      return res.status(401).send({ error: 'Невірний логін або пароль' });
    }
    res.send(user);
  } catch (e) {
    res.status(500).send(e);
  }
});

// --- PRODUCTS ---

// Отримати всі товари
router.get('/products', async (req, res) => {
  try {
    const products = await Product.find({});
    res.send(products);
  } catch (e) {
    res.status(500).send(e);
  }
});

// Додати товар
router.post('/products', async (req, res) => {
  try {
    const product = new Product(req.body);
    await product.save();
    res.status(201).send(product);
  } catch (e) {
    res.status(400).send(e);
  }
});

router.delete('/products/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const result = await Product.findByIdAndDelete(id);
    
    if (!result) {
      return res.status(404).send({ error: 'Товар не знайдено' });
    }
    
    res.send({ message: 'Товар успішно видалено', id });
  } catch (e) {
    res.status(500).send(e);
  }
});

router.get('/', async (req, res) => {
  try {
    const users = await User.find({});
    res.send(users);
  } catch (e) {
    res.status(500).send(e);
  }
});

module.exports = router;