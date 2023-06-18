import { Router } from "express";
import { authenticateUser } from '../middleware/authenticateUser.js'
import { registerUser, loginUser, userProfile,Auth} from '../controllers/controller.js'

const router = Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/profile', authenticateUser, userProfile);
router.post('/authenticate', authenticateUser,Auth)

export default router;