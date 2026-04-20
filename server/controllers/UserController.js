import User from '../models/UserModel.js'
import bcrypt from 'bcryptjs'

// Registration
export const Register = async(req,res)=>{
     try {
     const { username, email, password } = req.body;
     const hashPassword= await bcrypt.hash(password,10)
     const emaliExist =await User.findOne({email})
     if(emaliExist){
          return res.json({Message:'Email already exist'})
     }
     await User.create({ username, email, password:hashPassword })
     return res.json({Message:`${username} Created SuccessFully`})
}
catch(err){
res.json(err)
}
}

// Login

export const Login = async (req, res) => {
     try {
     const { email, password } = req.body;
          const userFound = await User.findOne({ email })
          const ispassword = await bcrypt.compare(password, userFound.password)
          if (!userFound || !ispassword) {
               return res.json({Message:false})
          }
          return res.json({ Message: true, user: userFound.username });
} catch (error) {
     res.json(error)
}
}

// select account

export const selectAccount = async (req, res) => {
     try {
     const { id } = req.params;
          const userFound = await User.findById({ _id:id })
          if (!userFound) {
               return res.json({Message:false})
          }
          return res.json({ Message: true, user: userFound });
} catch (error) {
     res.json(error)
}
}

// edit account

export const editAccount = async (req, res) => {
     try {
          const { id } = req.params;
     const { username,email, password } = req.body;
     const hashpassword = await bcrypt.hash(password, 10)
          const userUpdate = await User.findByIdAndUpdate(
            { _id: id },
            { username, email, password:hashpassword },
          );
          
          if (!username || !password || !email) {
               return res.json({succes:false,message:'You must fill all field'})
          }
          return res.json({ succes: true, message:`${userUpdate} Account Update Successfull` });
} catch (error) {
     res.json(error)
}
}


// delete Account 

export const deleteAccount = async (req, res) => {
     try {
     const { id } = req.params;
          const userDelete = await User.findByIdAndDelete({ _id:id })
          if (!userDelete) {
               return res.json({success:false})
          }
          return res.json({ success: true, message:'User Deleted Successfully' });
} catch (error) {
     res.json(error)
}
}

