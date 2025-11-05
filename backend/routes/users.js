const express = require('express');
const { PrismaClient } = require('@prisma/client');
const auth = require('../middleware/auth');

const router = express.Router();
const prisma = new PrismaClient();

router.get('/:id/history', auth, async (req, res, next) => {
  try {
    const userId = req.params.id;
    
    if (userId !== req.user.id) {
      return res.status(403).json({ error: 'Unauthorized' });
    }
    
    const requests = await prisma.request.findMany({
      where: { requesterId: userId },
      include: {
        donationQueue: {
          include: {
            donor: {
              select: { name: true, bloodGroup: true }
            }
          }
        }
      },
      orderBy: { createdAt: 'desc' }
    });
    
    const donations = await prisma.donationQueue.findMany({
      where: { donorId: userId },
      include: {
        request: {
          include: {
            requester: {
              select: { name: true, city: true }
            }
          }
        }
      },
      orderBy: { joinedAt: 'desc' }
    });
    
    res.json({ requests, donations });
  } catch (error) {
    next(error);
  }
});

module.exports = router;