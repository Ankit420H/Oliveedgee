import express from 'express';
import multer from 'multer';
import { storage } from '../config/cloudinary.js';

const router = express.Router();

const upload = multer({ storage });

router.post('/', (req, res, next) => {
    upload.single('image')(req, res, (err) => {
        if (err) {
            console.error('Cloudinary Upload Error:', err);
            return res.status(500).send({ message: err.message });
        }
        res.send({
            message: 'Image uploaded',
            image: req.file.path
        });
    });
});

export default router;
