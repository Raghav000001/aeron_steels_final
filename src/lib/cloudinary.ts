import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function uploadImage(buffer: Buffer): Promise<string> {
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      { folder: 'aeron_steels/products' },
      (error, result) => {
        if (error) {
          reject(error);
        } else if (result) {
          resolve(result.secure_url);
        } else {
          reject(new Error('Upload returned no result'));
        }
      }
    );
    uploadStream.end(buffer);
  });
}

export async function deleteImage(publicId: string): Promise<void> {
  await cloudinary.uploader.destroy(publicId);
}
