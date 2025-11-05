const validateSignup = (req, res, next) => {
  const { name, email, password, bloodGroup, city } = req.body;
  
  if (!name || !email || !password || !bloodGroup || !city) {
    return res.status(400).json({ error: 'All fields are required' });
  }
  
  if (password.length < 6) {
    return res.status(400).json({ error: 'Password must be at least 6 characters' });
  }
  
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ error: 'Invalid email format' });
  }
  
  next();
};

const validateRequest = (req, res, next) => {
  const { bloodGroup, unitsNeeded, location } = req.body;
  
  if (!bloodGroup || !unitsNeeded || !location) {
    return res.status(400).json({ error: 'Blood group, units needed, and location are required' });
  }
  
  if (unitsNeeded < 1 || unitsNeeded > 10) {
    return res.status(400).json({ error: 'Units needed must be between 1 and 10' });
  }
  
  next();
};

module.exports = { validateSignup, validateRequest };