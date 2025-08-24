export const allowRoles = (...roles) => (req, res, next) => {
if (!req.user) return res.status(401).json({ message: 'Unauthenticated' });
if (!roles.includes(req.user.role)) {
return res.status(403).json({ message: 'Forbidden: insufficient role' });
}
next();
};


export const ownsResource = (selector) => async (req, res, next) => {
// For endpoints where only the owner can modify (e.g., /todos/:id)
try {
const doc = await selector(req);
if (!doc) return res.status(404).json({ message: 'Not found' });
if (doc.userId?.toString?.() !== req.user.id) {
return res.status(403).json({ message: 'Forbidden: not your resource' });
}
req.resource = doc;
next();
} catch (e) {
next(e);
}
};