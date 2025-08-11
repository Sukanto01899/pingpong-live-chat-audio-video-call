const multer = require("multer");
const cloudinary = require("../utils/cloudinary");
const streamifier = require("streamifier");
const ApiError = require("../utils/ApiError");

// Multer config – use memory storage for buffer
const storage = multer.memoryStorage();
const upload = multer({ storage });

const uploadToCloudinary = (buffer, folder = "uploads") => {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      {
        folder,
        resource_type: "image",
      },
      (error, result) => {
        if (result) resolve(result);
        else reject(error);
      }
    );
    streamifier.createReadStream(buffer).pipe(stream);
  });
};


// Main Middleware
const imageUploadMiddleware = async (req, res, next) => {
  try {
    if (!req.file) {
      return next()
    }

    if(req.user.avatar?.public_id){
        await cloudinary.uploader.destroy(user.image.public_id);
    }

    const result = await uploadToCloudinary(req.file.buffer, 'uploads');
    req.avatar = {
      url: result.secure_url,
      public_id: result.public_id,
    };

    next();
  } catch (err) {
    console.error('Image upload failed:', err);
    throw new ApiError(500, 'Image upload failed.' )
  }
};

module.exports = {
  multerUpload: upload.single('image'), // 'image' should match your form field name
  imageUploadMiddleware,
};
