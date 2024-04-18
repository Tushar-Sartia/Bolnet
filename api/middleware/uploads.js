import multer from "multer";
 const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, 'uploads/'); // make sure this directory exists
    },
    filename: function(req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + file.originalname);
    }
});

export const upload = multer({ storage: storage });