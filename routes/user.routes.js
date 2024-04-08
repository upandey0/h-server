import express from 'express'
import { logoutUser, refreshUser, signInUser, signupUser } from '../controllers/user.controller.js';

const router = express.Router()

router.post('/signup', signupUser);
router.post('/signin', signInUser);
router.get('/getuser', refreshUser);
router.get('/logout', logoutUser);

export default router;