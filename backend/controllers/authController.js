const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

const signup = async (req, res, next) => {
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
};

const login = async (req, res, next) => {
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
};

module.exports = { signup, login };