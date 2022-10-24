import { container } from "tsyringe";

import { IDateProvider } from "./DateProvider/IDateProvider";
import { DayJsDateProvider } from "./DateProvider/implementations/DayJsDateProvider";
import { IMailProvider } from "./MailProvider/IMailProvider";
import { EtherealMailProvider } from "./MailProvider/implementations/EtherealMailProvider";
import { CloudinaryStorageProvider } from "./StorageProvider/implementations/CloudinaryStorageProvider";
import { LocalStorageProvider } from "./StorageProvider/implementations/LocalStorageProvider";
import { S3StorageProvider } from "./StorageProvider/implementations/S3StorageProvider";
import { IStorageProvider } from "./StorageProvider/IStorageProvider";

container.registerSingleton<IDateProvider>(
  "DayJsDateProvider",
  DayJsDateProvider
);

container.registerInstance<IMailProvider>(
  "EtherealMailProvider",
  new EtherealMailProvider()
);

// const storageMode = {
//   local: LocalStorageProvider,
//   s3: S3StorageProvider,
//   cloudinary: CloudinaryStorageProvider,
// };

// container.registerSingleton<IStorageProvider>(
//   "StorageProvider",
//   storageMode[process.env.STORAGE_MODE]
// );

container.registerSingleton<IStorageProvider>(
  "StorageProvider",
  CloudinaryStorageProvider
);
