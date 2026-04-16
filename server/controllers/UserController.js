import User from '../models/UserModel.js'

export const Register = async(req,res)=>{
try{
     const { username, email, password } = req.body;
     await User.create({ username, email, password })
     return res.json({Message:`${username} Created SuccessFully`})
}
catch(err){
res.json(err)
}
}

