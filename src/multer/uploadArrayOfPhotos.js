import multer from 'multer';
import { v4 as uuidv4 } from 'uuid';


export const uploadCover = (fieldName) => {
    const storage = multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, 'uploads/')
        },


        filename: (req, file, cb) => {
            cb(null, uuidv4() + "-" + file.originalname)
        }
    })

    function fileFilter(req, file, cb) {
        if (file.mimetype.startsWith('image')) {
            cb(null, true)
        } else {
            cb(new AppError('image only', 401), false)
        }
    }
    const upload = multer({ storage, fileFilter })

    return upload.array(fieldName, 3)
}
