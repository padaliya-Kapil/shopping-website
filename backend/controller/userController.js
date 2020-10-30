import asyncHandler from 'express-async-handler'

import User from '../models/userModel.js'
import generateToken from '../utils/generateTokens.js'


// @desc Auth users and get tokens
// @route POSY /api/users/login
// @access Public
const authUsers = asyncHandler ( async (req,res) => {
  
    const {email , password } = req.body
    const user = await User.findOne({email})

    if(user && (await user.matchPassword(password))){
            res.json({
                _id : user.id,
                name : user.name,
                email : user.email,
                isAdmin : user.isAdmin,
                token : generateToken(user._id) 
            })
    }else{
        res.status(401)
        throw new Error ('Invalid email or password')
    }
})

export {authUsers}