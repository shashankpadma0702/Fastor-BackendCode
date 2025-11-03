const express = require('express');
const router = express.Router();
const {
  createPublicEnquiry,
  getPublicEnquiries,
  getPrivateEnquiries,
  claimEnquiry
} = require('../controllers/enquiryController');
const protect = require('../middlewares/auth');

// Public route - anyone can submit an enquiry
router.post('/public', createPublicEnquiry);

// Protected routes - require counselor authentication
router.get('/public', protect, getPublicEnquiries);
router.get('/private', protect, getPrivateEnquiries);
router.patch('/:id/claim', protect, claimEnquiry);

module.exports = router;