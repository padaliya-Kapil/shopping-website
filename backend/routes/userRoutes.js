import {authUsers,getUserProfile , registerUsers} from '../controller/userController.js'
import {protect} from '../middleware/authMiddleware.js'

import express from 'express'
const router = express.Router()

router.route('/').post(registerUsers);
router.post('/login',authUsers);
router.route('/profile')
        .get(protect,getUserProfile);  // protect is the middleware


export default router