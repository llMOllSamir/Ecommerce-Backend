import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: "df5gyd5pu",
  api_key: "281562436289428",
  api_secret: "SwU-BG1s-Y29xYfvO0mTkdeH0hs",
  secure: true,
});

/**
 *  Upload one photo in cloudinary
 */
export let uploadOne = async (file, modelName) => {
  let { secure_url, public_id } = await cloudinary.uploader.upload(file.path, {
    folder: modelName,
  });
  return { secure_url, public_id };
};

/**
 *  Upload many photos in cloudinary
 *
 */
export const uploadMany = async (files, modelName) => {
  let uploaded = [];
  for (const file of files) {
    uploaded.push(await uploadOne(file, modelName));
  }
  return uploaded;
};

/**
 *  delete one photo from cloudinary
 */
export const destroyOne = async (publicId) => {
  await cloudinary.uploader.destroy(publicId);
};

/**
 *  delete many photos from cloudinary
 */
export const destroyMany = async (arr) => {
  for (const file of arr) {
    await cloudinary.uploader.destroy(file.public_id);
  }
};
