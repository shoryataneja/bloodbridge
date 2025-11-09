const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { PrismaClient } = require('@prisma/client');

const router = express.Router();
const prisma = new PrismaClient();

router.post('/signup', async (req, res, next) => {
  try {
    const { name, email, password, bloodGroup, city } = req.body;
    
    const hashedPassword = await bcrypt.hash(password, 10);
    
    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        bloodGroup,
        city
      }
    });
    
    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET);
    
    res.status(201).json({
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        bloodGroup: user.bloodGroup,
        city: user.city
      }
    });
  } catch (error) {
    next(error);
  }
});

router.post('/login', async (req, res, next) => {
  try {
    const { email, password } = req.body;
    
    const user = await prisma.user.findUnique({
      where: { email }
    });
    
    if (!user || !await bcrypt.compare(password, user.password)) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }
    
    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET);
    
    res.json({
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        bloodGroup: user.bloodGroup,
        city: user.city
      }
    });
  } catch (error) {
    next(error);
  }
});

router.put('/update-profile', async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
      return res.status(401).json({ error: 'No token provided' });
    }
    
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const { name, email, bloodGroup, city } = req.body;
    
    const updatedUser = await prisma.user.update({
      where: { id: decoded.userId },
      data: { name, email, bloodGroup, city }
    });
    
    res.json({
      id: updatedUser.id,
      name: updatedUser.name,
      email: updatedUser.email,
      bloodGroup: updatedUser.bloodGroup,
      city: updatedUser.city
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;