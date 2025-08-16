import { RequestHandler } from "express";
import User from "../models/User.js";
import jwt from "jsonwebtoken"

const jwtSecret = process.env.JWT_SECRET as string;
if (!jwtSecret) {
    throw new Error("JWT_SECRET environment variable is not defined");
}

export const RegisterUser:RequestHandler = async (req, res) => {
    
        const { email, password, name } = req.body;
        await User.create({
            name,
            email,
            password
        })

        res.status(201).json({
            message: "User registered successfully"
        })
}

export const LoginUser:RequestHandler = async (req, res) => {
    const {email, password} = req.body

    if(!email || !password) {
        res.status(422).json({
            message: "email dan password wajib di isi"
        })
        return
    }
    // validasi email harus uniq
    const userDoc = await User.findOne({ email })

    if(!userDoc){
        res.status(403).json({
            message: "email belum terdaftar"
        })
        return
    }

    // validasi password inputan apakah sama dengan di db


    const isPasswordMatched = await userDoc.comparePassword(password)

    if(!isPasswordMatched) {
        res.status(403).json({
            message: "password salah"
        })
        return
    }

    const AccessToken = jwt.sign({id: userDoc._id}, jwtSecret)

    userDoc.token = AccessToken

    await userDoc.save()

    res.status(200).json({
        message: "Berhasil Login",
        user: {
            id: userDoc._id,
            email: userDoc.email,
            name: userDoc.name,
            avatar: userDoc.avatar?.url,

        },
        token: AccessToken
    })
}