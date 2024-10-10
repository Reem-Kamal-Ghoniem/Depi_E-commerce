// role-based middleware
const customer = (req, res, next) => {
    if (req.user.role !== 'customer') return res.status(403).send('Access denied.');
    next();
  };
  
  const vendor = (req, res, next) => {
    if (req.user.role !== 'vendor') return res.status(403).send('Access denied.');
    next();
  };
  
  module.exports = { customer, vendor };
  