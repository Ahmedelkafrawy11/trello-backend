import multer from 'multer';
import { v4 as uuidv4 } from 'uuid';


export const uploadAttach = (fieldName) => {
    const storage = multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, 'uploads/')
        },


        filename: (req, file, cb) => {
            cb(null, uuidv4() + "-" + file.originalname)
        }
    })

    function fileFilter(req, file, cb) {
        console.log(file)
        if (file.mimetype.startsWith('pdf')) {
            cb(null, true)
        } else {
            cb(new AppError('pdf only', 401), false)
        }
    }
    const upload = multer({ storage, fileFilter })
    return upload.single(fieldName)
}