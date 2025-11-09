const express = require('express');
const { PrismaClient } = require('@prisma/client');
const auth = require('../middleware/auth');

const router = express.Router();
const prisma = new PrismaClient();

router.get('/', async (req, res, next) => {
  try {
    const posts = await prisma.galleryPost.findMany({
      include: {
        user: {
          select: { name: true, bloodGroup: true, city: true }
        }
      },
      orderBy: { createdAt: 'desc' }
    });
    
    res.json(posts);
  } catch (error) {
    next(error);
  }
});

router.post('/create', auth, async (req, res, next) => {
  try {
    const { imageUrl, message } = req.body;
    
    const post = await prisma.galleryPost.create({
      data: {
        userId: req.user.id,
        imageUrl,
        message
      },
      include: {
        user: {
          select: { name: true, bloodGroup: true, city: true }
        }
      }
    });
    
    res.status(201).json(post);
  } catch (error) {
    next(error);
  }
});

module.exports = router;