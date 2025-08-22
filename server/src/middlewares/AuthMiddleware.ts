import User from "../models/User.js"
import { RequestHandler } from "express"
import jwtPkg from "jsonwebtoken";
const { JsonWebTokenError, TokenExpiredError, ...jwt } = jwtPkg;

const JWTSECRET = process.env.JWT_SECRET as string

interface UserDocument {
    id: any,
    name: string
    email: string
    avatar?: string | undefined
    bio?: string | undefined
}

declare global {
    namespace Express {
        interface Request {
            user: UserDocument
        }
    }
}

export const isAuth: RequestHandler = async (req, res, next) => {
    try {
        const authToken = req.header("Authorization")
        if (!authToken) {
            res.status(401).json({
                message: "Token tidak ada"
            })
            return
        }

        // Bearer index 0
        // dfasdxasdwd
        const token = authToken.split("Bearer ")[1]
        if (!token) {
            res.status(401).json({ message: "Token tidak valid" })
            return
        }
        const decode = jwt.verify(token, JWTSECRET) as unknown as { id: string }

        // ambil data dari databse berdasarkan id decode di atas

        const userDoc = await User.findById(decode.id)

        if (!userDoc) {
            res.status(403).json({
                message: "User tidak ditemukan"
            })
            return
        }

        req.user = {
            id: userDoc._id,
            name: userDoc.name,
            email: userDoc.email,
            avatar: userDoc.avatar?.url,
            bio: userDoc.bio
        }
        next();
    } catch (error) {
        if (error instanceof TokenExpiredError) {
            res.status(401).json({ message: "Token sudah kadaluarsa" })
            return
        }
        if(error instanceof JsonWebTokenError) {
            res.status(401).json({ message: "Token tidak valid" })
            return
        }
        next(error)
    }
}

export const localUser: RequestHandler = async (req, res) => {
    const userDoc = await User.findOne({_id : req.user.id})

    if(!userDoc) {
        res.status(403).json({ message: "User tidak ditemukan" })
        return
    }

    userDoc.token = null

    await userDoc.save();

    res.status(200).json({
        message: "Berhasil Logout",
    })
}