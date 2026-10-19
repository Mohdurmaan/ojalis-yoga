const multer = require('multer');
const path = require('path');
const fs = require('fs');
const { cloudinary, isCloudinaryConfigured } = require('../config/cloudinary');

// Ensure local uploads directory exists (used for local fallback or development)
const uploadsDir = path.join(__dirname, '..', 'uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

// Memory storage keeps file buffers ready for streaming to Cloudinary or writing to disk
const storage = multer.memoryStorage();

function checkFileType(file, cb) {
  const filetypes = /jpg|jpeg|png|webp|avif|gif/;
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = filetypes.test(file.mimetype) || file.mimetype.startsWith('image/');

  if (extname && mimetype) {
    return cb(null, true);
  } else {
    cb(new Error('Only image files (JPG, PNG, WebP, AVIF, GIF) are allowed.'));
  }
}

const multerInstance = multer({
  storage,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB max
  fileFilter: function (req, file, cb) {
    checkFileType(file, cb);
  }
});

/**
 * Uploads a file buffer directly to Cloudinary via upload_stream
 */
const uploadToCloudinary = (fileBuffer, originalname) => {
  return new Promise((resolve, reject) => {
    const cleanBaseName = path.parse(originalname).name.replace(/[^a-zA-Z0-9_-]/g, '_');
    const publicId = `${cleanBaseName}-${Date.now()}`;

    const stream = cloudinary.uploader.upload_stream(
      {
        folder: 'ojalis-yoga',
        public_id: publicId,
        resource_type: 'image'
      },
      (error, result) => {
        if (error) return reject(error);
        resolve(result);
      }
    );

    stream.end(fileBuffer);
  });
};

/**
 * Saves a file buffer to the local uploads directory
 */
const saveToLocalDisk = async (file) => {
  const ext = path.extname(file.originalname).toLowerCase() || '.jpg';
  const cleanField = (file.fieldname || 'image').replace(/[^a-zA-Z0-9_-]/g, '');
  const filename = `${cleanField}-${Date.now()}-${Math.round(Math.random() * 1e6)}${ext}`;
  const destinationPath = path.join(uploadsDir, filename);

  await fs.promises.writeFile(destinationPath, file.buffer);

  file.filename = filename;
  file.path = `/uploads/${filename}`;
  file.url = `/uploads/${filename}`;
  return file;
};

/**
 * Processes an uploaded file: uploads to Cloudinary if configured, else saves to disk.
 * Falls back to disk if Cloudinary fails.
 */
const processFile = async (file) => {
  if (!file || !file.buffer) return file;

  if (isCloudinaryConfigured()) {
    try {
      const result = await uploadToCloudinary(file.buffer, file.originalname);
      file.filename = result.public_id;
      file.path = result.secure_url;
      file.url = result.secure_url;
      file.cloudinaryResult = result;
      return file;
    } catch (cloudErr) {
      console.warn('Cloudinary upload error, falling back to local storage:', cloudErr.message);
      return await saveToLocalDisk(file);
    }
  } else {
    return await saveToLocalDisk(file);
  }
};

/**
 * Wrapper object exposing multer-like methods with async persistent storage processing
 */
const upload = {
  single: (fieldName = 'image') => {
    return (req, res, next) => {
      multerInstance.single(fieldName)(req, res, async (err) => {
        if (err) {
          return res.status(400).json({ success: false, message: err.message || err });
        }
        if (!req.file) {
          return next();
        }
        try {
          await processFile(req.file);
          next();
        } catch (procErr) {
          console.error('File storage error:', procErr);
          return res.status(500).json({ success: false, message: 'Failed to store uploaded image' });
        }
      });
    };
  },

  array: (fieldName = 'images', maxCount = 10) => {
    return (req, res, next) => {
      multerInstance.array(fieldName, maxCount)(req, res, async (err) => {
        if (err) {
          return res.status(400).json({ success: false, message: err.message || err });
        }
        if (!req.files || req.files.length === 0) {
          return next();
        }
        try {
          await Promise.all(req.files.map(processFile));
          next();
        } catch (procErr) {
          console.error('Files storage error:', procErr);
          return res.status(500).json({ success: false, message: 'Failed to store uploaded images' });
        }
      });
    };
  }
};

module.exports = upload;
