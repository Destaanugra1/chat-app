import { RequestHandler } from "express";
import User from "../models/User.js";
import jwt from "jsonwebtoken"
import cloudinary from "../utils/claudinary.js";

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

export const getProfile: RequestHandler = async(req, res) => {
    res.json({
        user: req.user
    })
}

export const getUsers: RequestHandler = async (req, res) => {
    const getUsersData = await User.find({_id: {$ne: req.user.id}}).select(['-password', '-token'])

    res.json({
        messange: "all users",
        data: getUsersData
    })
}

export const uploadImageAvatar: RequestHandler = async (req, res) => {
    try {
        if(!req.file) {
            res.status(422).json({
                message: "file tidak ada yg di up"
            })
            return
        }
        const userDoc = await User.findById(req.user.id)
        if(!userDoc) {
            res.status(404).json({
                message: "user tidak di temukan"
            })
            return
        }

        if(userDoc.avatar && userDoc.avatar.id) {
            // hapus file yg lama jika avatar ada yang baru
            try {
              await cloudinary.uploader.destroy(userDoc.avatar.id);  
            } catch (error) {
                console.log("gagal hapus avatar", error);
                res.status(422).json({
                    message: "gagal hapus avatar lama"
                })
                return
            }
        }
        const fileSTR = `data:${req.file.mimetype};base64,${req.file.buffer.toString('base64')}`;

        const result = await cloudinary.uploader.upload(fileSTR, {
            folder: "profile",
            transformation: [{
                width: 300,
                height: 300,
                crop: "thumb",
                gravity: "face"
            }]
        });

        userDoc.avatar = {
            url: result.secure_url,
            id: result.public_id
        }

        await userDoc.save()

        res.status(201).json({
            message: "profile berhasil diupdate",
            user: {
                id: userDoc._id,
                email: userDoc.email,
                name: userDoc.name,
                avatar: userDoc.avatar?.url,
            }
        })
    } catch (error) {
       res.status(500).json({
        message: "uplload gagal",
        error: (error instanceof Error ? error.message : String(error))
       })
    }
}

export const updateProfileUser: RequestHandler = async(req, res) => {
    const userDoc = await User.findById(req.user.id)

    if(!userDoc) {
        res.status(404).json({
            message: "user tidak di temukan"
        })
        return
    }

    const {name, bio} = req.body

    userDoc.name = name
    userDoc.bio = bio

    await userDoc.save();

    res.status(201).json({
        message: "update profile berhasil",
        data: {
            name: userDoc.name,
            bio: userDoc.bio,
            email: userDoc.email,
            id: userDoc.id,
            avatar: userDoc.avatar?.url
        }
    })
}


export const updatePassword: RequestHandler = async (req, res) => {
   const {old_password, new_password, confirm_password} = req.body

   if(!old_password || !new_password || !confirm_password) {
    res.status(422).json({
        message: "inputan pw belum di isi semua"
    })
    return
   }

   const userDoc = await User.findById(req.user.id)

   if (!userDoc) {
    res.status(404).json({
        message: "user tidak di temukan"
    })
    return
   }

   const isPasswordMatch = await userDoc.comparePassword (old_password);

   if(!isPasswordMatch) {
    res.status(422).json({
        message: "password salah"
    })
    return
   }

   if(new_password.lenght <= 6) {
     res.status(422).json({
        message: "password berhasil di ubah"
     })
   }

   if(new_password !==  confirm_password) {
    res.status(422).json({
        message: "password baru tidak sama"
    })
    return
   }

   userDoc.password = new_password

   await userDoc.save()

   res.status(201).json({
    message: "password berhasil di ubah"
   })

}