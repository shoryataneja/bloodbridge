const express = require('express');
const { PrismaClient } = require('@prisma/client');
const auth = require('../middleware/auth');
const { generateCertificate } = require('../utils/pdfGenerator');

const router = express.Router();
const prisma = new PrismaClient();

router.post('/create', auth, async (req, res, next) => {
  try {
    const { bloodGroup, unitsNeeded, location, message } = req.body;
    
    const request = await prisma.request.create({
      data: {
        requesterId: req.user.id,
        bloodGroup,
        unitsNeeded,
        location,
        message
      },
      include: {
        requester: {
          select: { name: true, city: true }
        }
      }
    });
    
    res.status(201).json(request);
  } catch (error) {
    next(error);
  }
});

router.get('/', async (req, res, next) => {
  try {
    const requests = await prisma.request.findMany({
      where: { status: 'active' },
      include: {
        requester: {
          select: { name: true, city: true }
        },
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
    
    res.json(requests);
  } catch (error) {
    next(error);
  }
});

router.get('/:id', async (req, res, next) => {
  try {
    const request = await prisma.request.findUnique({
      where: { id: req.params.id },
      include: {
        requester: {
          select: { name: true, city: true, email: true }
        },
        donationQueue: {
          include: {
            donor: {
              select: { name: true, bloodGroup: true, city: true }
            }
          }
        }
      }
    });
    
    if (!request) {
      return res.status(404).json({ error: 'Request not found' });
    }
    
    res.json(request);
  } catch (error) {
    next(error);
  }
});

router.post('/:id/join', auth, async (req, res, next) => {
  try {
    const requestId = req.params.id;
    const donorId = req.user.id;
    
    const existingEntry = await prisma.donationQueue.findUnique({
      where: {
        requestId_donorId: {
          requestId,
          donorId
        }
      }
    });
    
    if (existingEntry) {
      return res.status(400).json({ error: 'Already in queue' });
    }
    
    const queueEntry = await prisma.donationQueue.create({
      data: {
        requestId,
        donorId
      }
    });
    
    res.status(201).json(queueEntry);
  } catch (error) {
    next(error);
  }
});

router.delete('/:id/leave', auth, async (req, res, next) => {
  try {
    const requestId = req.params.id;
    const donorId = req.user.id;
    
    await prisma.donationQueue.delete({
      where: {
        requestId_donorId: {
          requestId,
          donorId
        }
      }
    });
    
    res.json({ message: 'Left queue successfully' });
  } catch (error) {
    next(error);
  }
});

router.post('/:id/complete', auth, async (req, res, next) => {
  try {
    const requestId = req.params.id;
    
    const request = await prisma.request.findUnique({
      where: { id: requestId },
      include: {
        donationQueue: {
          include: {
            donor: true
          }
        }
      }
    });
    
    if (!request || request.requesterId !== req.user.id) {
      return res.status(403).json({ error: 'Unauthorized' });
    }
    
    await prisma.request.update({
      where: { id: requestId },
      data: { status: 'completed' }
    });
    
    const certificates = [];
    for (const entry of request.donationQueue) {
      const certificateUrl = await generateCertificate(entry.donor, request);
      certificates.push({
        donorId: entry.donorId,
        certificateUrl
      });
    }
    
    await prisma.donationQueue.deleteMany({
      where: { requestId }
    });
    
    res.json({ message: 'Request completed', certificates });
  } catch (error) {
    next(error);
  }
});

module.exports = router;