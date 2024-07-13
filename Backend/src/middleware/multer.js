import multer from 'multer'
import path from 'path'
import fs from 'fs'

const tempDir = process.env.UPLOAD_DIR || path.join(__dirname, '..', 'public', 'temp');

if (!fs.existsSync(tempDir)){
    fs.mkdirSync(tempDir, { recursive: true });
}

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, tempDir);
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
})

export const upload = multer({ storage });
