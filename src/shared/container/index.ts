import { container } from "tsyringe";

import { UsersRepository } from "@modules/accounts/infra/prisma/repositories/UsersRepository";
import { UserTokensRepository } from "@modules/accounts/infra/prisma/repositories/UserTokensRepository";
import { IUsersRepository } from "@modules/accounts/repositories/IUsersRepository";
import { IUserTokensRepository } from "@modules/accounts/repositories/IUserTokensRepository";
import { CategoriesRepository } from "@modules/properties/infra/prisma/repositories/CategoriesRepository";
import { FeaturesRepository } from "@modules/properties/infra/prisma/repositories/FeaturesRepository";
import { PropertiesRepository } from "@modules/properties/infra/prisma/repositories/PropertiesRepository";
import { PropertyImagesRepository } from "@modules/properties/infra/prisma/repositories/PropertyImagesRepository";
import { ICategoriesRepository } from "@modules/properties/repositories/ICategoriesRepository";
import { IFeaturesRepository } from "@modules/properties/repositories/IFeaturesRepository";
import { IPropertiesRepository } from "@modules/properties/repositories/IPropertiesRepository";
import { IPropertyImagesRepository } from "@modules/properties/repositories/IPropertyImagesRepository";

import "../container/providers";

container.registerSingleton<ICategoriesRepository>(
  "CategoriesRepository",
  CategoriesRepository
);

container.registerSingleton<IFeaturesRepository>(
  "FeaturesRepository",
  FeaturesRepository
);

container.registerSingleton<IUsersRepository>(
  "UsersRepository",
  UsersRepository
);

container.registerSingleton<IUserTokensRepository>(
  "UserTokensRepository",
  UserTokensRepository
);

container.registerSingleton<IPropertiesRepository>(
  "PropertiesRepository",
  PropertiesRepository
);

container.registerSingleton<IPropertyImagesRepository>(
  "PropertyImagesRepository",
  PropertyImagesRepository
);
