import cloudinary from "cloudinary";
import fs from "fs";
import { resolve } from "path";

import upload from "@config/upload";

import { IStorageProvider } from "../IStorageProvider";

class CloudinaryStorageProvider implements IStorageProvider {
  async store(file: string, folder: string): Promise<string> {
    const originalName = resolve(upload.tmpFolder, file);

    const options = {
      use_filename: true,
      unique_filename: false,
      overwrite: true,
      folder,
    };

    cloudinary.v2.config({
      secure: true,
    });

    try {
      const result = await cloudinary.v2.uploader.upload(originalName, options);

      await fs.promises.unlink(originalName);

      return result.public_id;
    } catch (error) {
      console.error(error);
    }
  }

  async delete(file: string, folder: string): Promise<void> {
    await cloudinary.v2.uploader.destroy(file, function (result) {
      console.log(result);
    });
  }
}
export { CloudinaryStorageProvider };
