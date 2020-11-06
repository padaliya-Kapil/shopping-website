import {authUsers,
        getUserProfile ,
         registerUsers,
         updateUserProfile,
         getUsers,
         deleteUser,
         getUserById,
         updateUser
        } from '../controller/userController.js'
import {protect , admin } from '../middleware/authMiddleware.js'

import express from 'express'
const router = express.Router()

router.route('/').post(registerUsers)
                .get(protect , admin ,  getUsers)
router.post('/login',authUsers);
router.route('/profile')
        .get(protect,getUserProfile)  // protect is the middleware
        .put(protect,updateUserProfile)
router.route('/:id') 
        .delete(protect , admin , deleteUser)
        .get(protect,admin ,getUserById)
        .put(protect,admin,updateUser)

export default router