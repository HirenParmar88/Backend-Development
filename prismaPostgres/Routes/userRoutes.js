import {Router} from 'express';
import {createUser, deleteUser, getAllUser, updateUser} from '../Controller/UserController.js';

const router = Router();

router.post('/', createUser)
router.get('/', getAllUser)
router.put('/:id', updateUser)
router.delete('/:id', deleteUser)

export default router;