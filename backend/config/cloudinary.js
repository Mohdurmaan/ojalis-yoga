const cloudinary = require('cloudinary').v2;

// Check if Cloudinary is configured via discrete vars or CLOUDINARY_URL
const isCloudinaryConfigured = () => {
  const hasDiscrete = !!(
    process.env.CLOUDINARY_CLOUD_NAME &&
    process.env.CLOUDINARY_API_KEY &&
    process.env.CLOUDINARY_API_SECRET
  );
  const hasUrl = !!process.env.CLOUDINARY_URL;
  return hasDiscrete || hasUrl;
};

if (isCloudinaryConfigured()) {
  if (process.env.CLOUDINARY_URL) {
    cloudinary.config({
      cloudinary_url: process.env.CLOUDINARY_URL
    });
  } else {
    cloudinary.config({
      cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
      api_key: process.env.CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_API_SECRET,
      secure: true
    });
  }
}

module.exports = {
  cloudinary,
  isCloudinaryConfigured
};
