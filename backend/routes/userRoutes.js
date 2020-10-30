import {authUsers,getUserProfile} from '../controller/userController.js'
import {protect} from '../middleware/authMiddleware.js'

import express from 'express'
const router = express.Router()

router.post('/login',authUsers);
router.route('/profile')
        .get(protect,getUserProfile);  // protect is the middleware


export default router