const { v2: cloudinary } = require("cloudinary");
const fs = require("fs");

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  
});

const uploadOnCloudinary = async (localFilePath) => {
  try {
    // console.log(process.env.CLOUDINARY_API_KEY);

    if (!localFilePath) {
      console.log("No file path provided");
      return null;
    }
    console.log("Uploading file:", localFilePath);

    // Upload the file to Cloudinary
    const response = await cloudinary.uploader.upload(localFilePath, {
      resource_type: "auto",
    });

    // File has been uploaded successfully
    console.log("File uploaded successfully:", response.url);

    // Remove the locally saved temporary file
    fs.unlinkSync(localFilePath);
    return response;
  } catch (error) {
    console.error("Cloudinary upload error:", error);

    // Remove the locally saved temporary file in case of failure
    if (fs.existsSync(localFilePath)) {
      fs.unlinkSync(localFilePath);
    }
    return null;
  }
};

module.exports = { uploadOnCloudinary };
