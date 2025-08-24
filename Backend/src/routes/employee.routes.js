import { Router } from 'express';
import { body } from 'express-validator';
import { auth } from '../middleware/auth.js';
import { allowRoles } from '../middleware/roles.js';
import {
listEmployees,
createEmployee,
updateEmployee,
deleteEmployee
} from '../controllers/employeeController.js';


const router = Router();


// List: Admin & Manager can view all
router.get('/', auth, allowRoles('admin', 'manager'), listEmployees);


// Create: Admin & Manager
router.post(
'/',
auth,
allowRoles('admin', 'manager'),
[body('name').notEmpty(), body('email').isEmail(), body('role').isIn(['admin','manager','user'])],
createEmployee
);


// Update: Admin & Manager
router.put(
'/:id',
auth,
allowRoles('admin', 'manager'),
[body('name').optional().notEmpty(), body('email').optional().isEmail(), body('role').optional().isIn(['admin','manager','user'])],
updateEmployee
);


// Delete: Admin only
router.delete('/:id', auth, allowRoles('admin'), deleteEmployee);


export default router;