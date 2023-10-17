import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import users from "../models/auth.js";
import mailSender from "../utils/mailSender.js";
import crypto from 'crypto'
import OTP from '../models/OTP.js'
import chat from '../models/chatUser.js'
import otpGenerator from 'otp-generator'


export const signup = async (req, res) => {
    const { name, email, password } = req.body;
    try {
        const existinguser = await users.findOne({ email });
        if (existinguser) {
            console.log("User Already exist")
            console.log(existinguser);
            return res.status(404).json({ message: "User already Exist." });
        }

        const hashedPassword = await bcrypt.hash(password, 12);
        const newUser = await users.create({
            name,
            email,
            password: hashedPassword,
        });
        const token = jwt.sign(
            { email: newUser.email, id: newUser._id },
            process.env.JWT_SECRET,
            { expiresIn: "1000h" }
        );

        res.status(200).json({ result: newUser, token });
    } catch (error) {
        console.log(error);
        return res.status(400).json({
            success: false,
            message: "Something went wrong",
        });
    }
};

export const login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const existinguser = await users.findOne({ email });
        if (!existinguser) {
            console.log("User Does not exist");
            return res.status(404).json({ message: "User don't Exist." });
        }
        const isPasswordCrt = await bcrypt.compare(password, existinguser.password);
        if (!isPasswordCrt) {
            return res.status(400).json({ message: "Invalid credentials" });
        }
        const token = jwt.sign(
            { email: existinguser.email, id: existinguser._id },
            process.env.JWT_SECRET,
            { expiresIn: "1000h" }
        );
        res.status(200).json({ result: existinguser, token });
    } catch (error) {
        res.status(500).json("Something went worng...");
    }
};

export const forgotPassword = async (req, res) => {
    try {

        const email = req.body.email;
        const user = await users.findOne({ email: email });

        if (!user) {
            return res.status(404).json({
                success: false,
                message: `This Email: ${email} is not Registered With Us Enter a Valid Email `,
            });
        }
        const token = crypto.randomBytes(20).toString("hex");

        const updatedDetails = await users.findOneAndUpdate(
            { email: email },
            {
                token: token,
                resetPasswordExpires: Date.now() + 3600000,
            },
            { new: true }
        );
        console.log("DETAILS", updatedDetails);

        const url = `https://lakshya-stackoverflow.vercel.app/rest-password/${token}`;


        await mailSender(
            email,
            "Password Reset",
            `Your Link for email verification is ${url}. Please click this url to reset your password.`
        );

        res.json({
            success: true,
            message:
                "Email Sent Successfully, Please Check Your Email to Continue Further",
        });
    } catch (error) {
        return res.status(402).json({
            error: error.message,
            success: false,
            message: `Some Error in Sending the Reset Message`,
        });
    }

};

export const restPassword = async (req, res) => {

    try {
        const { email, password } = req.body;





        const encryptedPassword = await bcrypt.hash(password, 12);


        await users.findOneAndUpdate(
            { email },
            { password: encryptedPassword },
            { new: true }
        );
        res.json({
            success: true,
            message: `Password Reset Successful`,
        });

    }
    catch (error) {
        return res.json({
            error: error.message,
            success: false,
            message: `Some Error in Updating the Password`,
        });
    }

}

// Send OTP For Email Verification
export const sendOtp = async (req, res) => {
    try {
        const { email } = req.body;


        var otp = otpGenerator.generate(6, {
            upperCaseAlphabets: false,
            lowerCaseAlphabets: false,
            specialChars: false,
        });
        const result = await OTP.findOne({ otp: otp });
        console.log("Result is Generate OTP Func");
        console.log("OTP", otp);
        console.log("Result", result);
        while (result) {
            otp = otpGenerator.generate(6, {
                upperCaseAlphabets: false,
            });
        }
        const otpPayload = { email, otp };
        const otpBody = await OTP.create(otpPayload);
        console.log("OTP Body", otpBody);
        res.status(200).json({
            success: true,
            message: `OTP Sent Successfully`,
            otp,
        });
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({ success: false, error: error.message });
    }
};



export const verifyOTP = async (req, res) => {

    try {
        const { email, otp } = req.body;

        if (!otp) {
            return res.status(403).send({
                success: false,
                message: "All Fields are required",
            });
        }

        // Find the most recent OTP for the email
        const response = await OTP.find({ email }).sort({ createdAt: -1 }).limit(1);
        console.log(response);

        if (response.length === 0) {
            // OTP not found for the email
            return res.status(400).json({
                success: false,
                message: "The OTP is not valid",
            });
        } else if (otp !== response[0].otp) {
            // Invalid OTP
            return res.status(400).json({
                success: false,
                message: "The OTP is not valid",
            });
        }

        const user = await chat.create({
            email

        });

        await user.save();




        return res.status(200).json({
            success: true,
            user,
            message: "OTP Verified",
        });
    } catch (error) {

        console.log(error);
        return res.status(404).json({
            success: false,
            message: "Can not verify otp",
        });
    }
}
