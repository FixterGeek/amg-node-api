const cloudinary = require('cloudinary');
const cloudinaryStorage = require('multer-storage-cloudinary');
const multer = require('multer');

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_SECRET
});

// cloudinary.image("lady.jpg", {transformation: [
//   {width: 400, height: 400, gravity: "face", radius: "max", crop: "crop"},
//   {width: 200, crop: "scale"}
//   ]})

const upload = (folder) =>{  
    const storage = cloudinaryStorage({
      cloudinary,
      folder: folder, // The name of the folder in cloudinary
      allowedFormats: ['jpg', 'png','jpeg','gif','pdf'],      
      filename: function (req, file, cb) {            
        cb(null, `${file.originalname}-${new Date()}`); 
      }
    });
    const uploadCloud = multer({ storage: storage });
    return uploadCloud
}

module.exports = upload;