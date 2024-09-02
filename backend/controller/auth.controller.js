import User from "../model/user.model.js";
import { errorHandle } from "../utils/error.js";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken"

export const signUp = async (req, res, next) => {
  const { userName, email, password } = req.body;

  try{
    const isValidUser = await User.findOne({ email: email });

    if (isValidUser) {
      // console.log("USER EXISTS");
      return next(errorHandle(400, "User Already Exists"));
    }
  }catch(error){
    next(error);
  }

  const hashedPassword = bcryptjs.hashSync(password, 10);

  const newUser = new User({
    userName,
    email,
    password: hashedPassword,
  });

  try {
    await newUser.save();
    res.status(201).json({
      success: true,
      message: "User created SuccessFully",
    });
  } catch (error) {
    next(error);
  }
};


export const login = async(req , res , next) => {

  const {email , password} = req.body;

  

  try{
    // console.log("Hello")
    const validUser = await User.findOne({email:email});

    if(!validUser){
      return next(errorHandle(404 , "User Not Found"));
    }
    
    const validPassword = bcryptjs.compareSync(password , validUser.password);
    // console.log(validUser);
    // console.log(validUser.doc);
    if(!validPassword){
      return next(errorHandle(404 , "Password Doesn't Match"));
    }
    

    // console.log("yaha se pass")
    const token = await jwt.sign({id: validUser._id} , process.env.JWT_SECRET);
    
    const {password : pass , ...rest} = validUser._doc;
    

    res.cookie("access_token" , token , {httpOnly : true}).status(200).json({
      success:true,
      message:"Login SuccessFull",
      rest,
    })
    
  }catch(error){

    next(error);

  }
}

export const signOut = async(req , res) => {

  try{
    
    res.clearCookie("access_token");
    res.status(200).json({
      success: true,
      message: "Signout SuccessFully",
    })
  }catch(error){
    next(error);
  }

}