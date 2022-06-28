 
const  multer = require('multer');
const path = require('path')

const imageStorage = multer.diskStorage({
        // Destination to store image     
        destination: './uploads',
        filename: (req, file, cb) => {
                cb(null, file.fieldname + '_' + Date.now()
                        + path.extname(file.originalname))
                // file.fieldname is name of the field (image)
                // path.extname get the uploaded file extension
        }
});


const fileUpload = multer({
        storage: imageStorage,
        limits: {
                fileSize: 1000000 // 1000000 Bytes = 10 MB
        },
        fileFilter(req, file, cb) {
                if (!file.originalname.match(/\.(png|jpg|xlsx|jpeg)$/)) {
                        // upload only png and jpg format
                        return cb(new Error('Please ckeck Image path'))
                }
                cb(undefined, true)
        }
})

module.exports = fileUpload;