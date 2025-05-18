import User from "../models/user-model.js"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"

export const register = async (req,res) =>{
    try {
        const {firstname, lastname, email, contact, password, role} = req.body;
        if(!firstname || !lastname || !email || !contact || !password || !role ){
            return res.status(400).json({
                message:"Something is missing",
                success:false
            })
        }
        
        const user =  await User.findOne({email})
        if(user){
            return res.status(400).json({
                message:"Email is already in use",
                success:false
            })
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        
        await User.create({
            firstname,
            lastname,
            email,
            contact,
            password:hashedPassword,
            role,
        })

        return res.status(200).json({
            message:"Account created successfully",
            success:true
        })

    } catch (error) {
        res.status(404).json({
            success:false,
            message:error
        })      
        console.log(error)  
    }


} 


const cookieParamsLogin = { maxAge: 1 * 24 * 60 * 60 * 1000, httpOnly: true, sameSite: 'strict' };

export const login = async (req, res) => {
    try {
        const { email, password, role } = req.body;

        if (!email || !password || !role) {
            return res.status(400).json({
                message: "Something is missing",
                success: false,
            });
        }

        let user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({
                message: "Incorrect email.",
                success: false,
            });
        }

        const isPasswordMatch = await bcrypt.compare(password, user.password);
        if (!isPasswordMatch) {
            return res.status(400).json({
                message: "Incorrect password.",
                success: false,
            });
        }

        if (role !== user.role) {
            return res.status(400).json({
                message: "Account doesn't exist with the current role.",
                success: false,
            });
        }

        // Create token with userId
        const tokenData = {
            userId: user._id,
        };

        const token = jwt.sign(tokenData, process.env.JWT_SECRET, { expiresIn: '1d' });

        user = {
            userId: user._id,
            firstname: user.firstname,
            lastname: user.lastname,
            email: user.email,
            role: user.role,
            profile: user.profile,
        };

        // Send token as a cookie
        return res.status(200).cookie("token", token, cookieParamsLogin).json({
            message: `Welcome Back ${user.firstname} ${user.lastname}`,
            user,
            success: true,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
        console.error(error);
    }
};


export const logout = async (req,res) =>{

    try {
        return res.status(200).cookie("token", "" ,{maxAge:0}).json({
            message:"Logout Successfully",
            success:true,
        })
    } catch (error) {
        res.status(404).json({
            success:false,
            message:error
        })      
        console.log(error)     
    }
}

export const updateProfile = async (req, res) => {
    try {
        const { firstname, lastname, email, contact, bio, skills } = req.body;

        if (!firstname) {
            return res.status(400).json({
                message: "Firstname is required",
                success: false,
            });
        }

        let skillsArray = [];
        if (skills && skills.length > 0) {
            skillsArray = skills.split(",").map((skill) => skill.trim());
        }

        console.log("User ID from token:", req.userId); // Debugging log

        const userId = req.userId;

        // Use the User model to find the user by ID
        let user = await User.findById(userId);
        console.log("User from database:", user); // Debugging log

        if (!user) {
            return res.status(404).json({
                message: "User not found",
                success: false,
            });
        }

        if (firstname) user.firstname = firstname;
        if (lastname) user.lastname = lastname;
        if (email) user.email = email;
        if (contact) user.contact = contact;
        if (bio) user.profile.bio = bio;
        if (skillsArray.length > 0) user.profile.skills = skillsArray;

        await user.save();

        user = {
            userId: user._id,
            firstname: user.firstname,
            lastname: user.lastname,
            email: user.email,
            role: user.role,
            profile: user.profile,
        };

        return res.status(200).json({
            message: "Profile Updated Successfully",
            user,
            success: true,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
        console.error(error);
    }
};