// authentication middleware
const jwt = require('jsonwebtoken');

const auth = (req, res, next) => {
  const token = req.headers['authorization']?.split(' ')[1];
  if (!token) return res.status(401).send('Access denied.');

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) return res.status(403).send('Invalid token.');
    req.user = decoded; // Attach the decoded token data to the request
    next();
  });
};

module.exports = auth;

// protected routes
router.get('/customer-dashboard', auth, customer, (req, res) => {
    res.send('Welcome to the Customer Dashboard');
  });
  
  router.get('/vendor-dashboard', auth, vendor, (req, res) => {
    res.send('Welcome to the Vendor Dashboard');
  });
  
