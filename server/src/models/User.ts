import { compare, genSalt, hash } from "bcrypt";
import { model } from "mongoose";
import { Schema } from "mongoose";

interface UserDocument extends Document {
    email: string;
    password: string;
    name: string;
    token: string | null;
    bio?: string;
    avatar?: {
        url: string;
        id: string;
    }

    model: string;
}

interface Methods{
    comparePassword:(inputPassword: string) => Promise<boolean>
}


const UserSchema = new Schema<UserDocument, {}, Methods>({
    email: {
        required: [true, "email harus diisi"],
        type: String,
        unique: [true, "email sudah terdaftar"],
        match: [/^\S+@\S+\.\S+$/, "email tidak valid"]
    },
    name: {
        required: [true, "name harus diisi"],
        type: String,
        unique: [true, "username sudah di gunakan"]
    },
    password: {
        required: [true, "password harus diisi"],
        type: String,
       min: [6, "password harus lebih dari 6 karakter"]
    },
    token: {
        type: String
    },
    bio: {
        type: String,
    },
    avatar: {
        type: Object,
        url: String,
        id: String
    }
}, { timestamps: true });

UserSchema.pre('save', async function (next) {
    if(this.isModified('password')) {
        const salt = await genSalt(10);
        this.password = await hash(this.password, salt);
    }
   next();
});

UserSchema.methods.comparePassword = async function (inputPassword) {
    return await compare(inputPassword, this.password);
}

const User = model ("user", UserSchema);

export default User;