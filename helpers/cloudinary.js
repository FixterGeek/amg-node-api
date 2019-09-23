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

exports.upload = (folder) =>{
    const storage = cloudinaryStorage({
      cloudinary,
      folder: folder, // The name of the folder in cloudinary
      allowedFormats: ['jpg', 'png','jpeg','gif','pdf', '.pem', '.key', '.cer'],
      filename: function (req, file, cb) {            
        cb(null, `${file.originalname}-${new Date()}`); 
      }
    });
    const uploadCloud = multer({ storage: storage });
    return uploadCloud
}

exports.uploadAndResize = (folder) =>{ 
  const storage = cloudinaryStorage({
    cloudinary,    
    folder: folder, // The name of the folder in cloudinary
    transformation:function(req,file,cb){
      console.log(file)
      if(file.fieldname=="mainImages"){
        return cb(null,{width:700})                
      }
      if(file.fieldname=="thumbnailImages"){
        //width: 400, aspect_ratio: "4:3"
        return cb(null,{width:400})                
      }
      if(file.fieldname=="iconImages"){
        return cb(null,{width:200,})                
      }
      cb()
    },
    allowedFormats: ['jpg', 'png','jpeg','gif','pdf'],      
    filename: function (req, file, cb) {
      if(file.fieldname=="thumbnailImages"){
        return cb(null,`thumbnail-${file.originalname}-${new Date()}`)                
      }
      if(file.fieldname=="iconImages"){
        return cb(null,`icon-${file.originalname}-${new Date()}`)                
      }      
      cb(null, `${file.originalname}-${new Date()}`); 
    }
  });
  const uploadCloud = multer({ storage: storage });
  return uploadCloud
}

