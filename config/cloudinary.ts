
import streamifier from 'streamifier';
import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const uploadImage = async (buffer, fileName) => {
    return new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        {
          folder: process.env.CLOUDINARY_FOLDER_NAME || 'custom_folder',
          upload_preset: 'ml_default',
          filename_override: fileName
        },
        (error , result ) => {
          if (result) resolve(result);
          else reject(error);
        },
      );
      streamifier.createReadStream(buffer).pipe(uploadStream);
    });
  }

