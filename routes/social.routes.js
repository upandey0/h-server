import express from 'express';
import  socialController, { getTeams }  from '../controllers/social.controller.js';
import authUser from '../middlewares/authUser.js';
const router = express.Router();

router.get('/peole',socialController)
router.get('/teams',authUser, getTeams)
export default router;