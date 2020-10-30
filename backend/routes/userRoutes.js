import {authUsers} from '../controller/userController.js'

import express from 'express'
const router = express.Router()

router.post('/login',authUsers);


export default router