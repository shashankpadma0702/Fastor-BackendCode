const { Enquiry, Employee } = require('../models');

const createPublicEnquiry = async (req, res) => {
  try {
    const { name, email, courseInterest } = req.body;

    if (!name || !email || !courseInterest) {
      return res.status(400).json({ 
        message: 'All fields (name, email, courseInterest) are required' 
      });
    }

    const enquiry = await Enquiry.create({
      name,
      email,
      courseInterest,
      claimed: false,
      counselorId: null
    });

    res.status(201).json({
      message: 'Enquiry submitted successfully',
      enquiry
    });

  } catch (error) {
    console.error('Create enquiry error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

const getPublicEnquiries = async (req, res) => {
  try {
    const enquiries = await Enquiry.findAll({
      where: { claimed: false },
      order: [['createdAt', 'DESC']]
    });

    res.status(200).json({
      message: 'Public enquiries retrieved successfully',
      enquiries,
      count: enquiries.length
    });

  } catch (error) {
    console.error('Get public enquiries error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

const getPrivateEnquiries = async (req, res) => {
  try {
    const counselorId = req.user.id;

    const enquiries = await Enquiry.findAll({
      where: { counselorId },
      include: [{
        model: Employee,
        attributes: ['id', 'name', 'email']
      }],
      order: [['createdAt', 'DESC']]
    });

    res.status(200).json({
      message: 'Private enquiries retrieved successfully',
      enquiries,
      count: enquiries.length
    });

  } catch (error) {
    console.error('Get private enquiries error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

const claimEnquiry = async (req, res) => {
  try {
    const enquiryId = req.params.id;
    const counselorId = req.user.id;

    const enquiry = await Enquiry.findByPk(enquiryId);
    
    if (!enquiry) {
      return res.status(404).json({ message: 'Enquiry not found' });
    }

    if (enquiry.claimed) {
      return res.status(409).json({ 
        message: 'This lead has already been claimed by another counselor' 
      });
    }

    enquiry.claimed = true;
    enquiry.counselorId = counselorId;
    await enquiry.save();

    const updatedEnquiry = await Enquiry.findByPk(enquiryId, {
      include: [{
        model: Employee,
        attributes: ['id', 'name', 'email']
      }]
    });

    res.status(200).json({
      message: 'Lead claimed successfully',
      enquiry: updatedEnquiry
    });

  } catch (error) {
    console.error('Claim enquiry error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {
  createPublicEnquiry,
  getPublicEnquiries,
  getPrivateEnquiries,
  claimEnquiry
};