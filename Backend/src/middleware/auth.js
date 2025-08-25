import jwt from 'jsonwebtoken';

const auth = (roles = []) => {
  return (req, res, next) => {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    if (!token) return res.status(401).json({ msg: 'No token' });

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET); // Use env variable
      req.user = decoded; // { id, role }
      if (roles.length && !roles.includes(req.user.role)) {
        return res.status(403).json({ msg: 'Access denied' });
      }
      next();
    } catch (err) {
      res.status(401).json({ msg: 'Invalid token' });
    }
  };
};

export { auth }; // Named export