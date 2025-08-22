import multer from "multer";
import path from "path";

//  penyimpanan sementara
const storage = multer.memoryStorage();

const fileFilter = (req:any, file:any, cb:any) => {
    const ext = path.extname(file.originalname).toLowerCase();
    if(ext != ".jpg" && ext != ".jpeg" && ext != ".png") {
        return cb(new Error("Only .jpg, .jpeg and .png files are allowed"), false);
    }
    cb(null, true);
}

const upload = multer({storage, fileFilter});

export default upload;
