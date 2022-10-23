import { RequestHandler, Router } from "express";
import multer from "multer";

import { CreatePropertyController } from "@modules/properties/useCases/createProperty/CreatePropertyController";
import { ListPropertiesController } from "@modules/properties/useCases/listProperties/ListPropertiesController";
import { UpdatePropertyController } from "@modules/properties/useCases/updateProperty/UpdatePropertyController";
import { UpdatePropertyImagesController } from "@modules/properties/useCases/updatePropertyImages/updatePropertyImagesController";

import uploadConfig from "../../../../config/upload";
import { ensureAdmin } from "../middlewares/ensureAdmin";
import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";

const uploadImages = multer(uploadConfig);

const propertiesRoutes = Router();

const listPropertyController = new ListPropertiesController();
const createPropertyController = new CreatePropertyController();
const updatePropertyController = new UpdatePropertyController();
const updatePropertyImagesController = new UpdatePropertyImagesController();

propertiesRoutes.get(
  "/",
  ensureAuthenticated as RequestHandler,
  listPropertyController.handle as RequestHandler
);

propertiesRoutes.post(
  "/",
  ensureAuthenticated as RequestHandler,
  ensureAdmin,
  createPropertyController.handle
);

propertiesRoutes.patch(
  "/:propertyId",
  ensureAuthenticated as RequestHandler,
  ensureAdmin,
  updatePropertyController.handle
);

propertiesRoutes.post(
  "/images/:propertyId",
  ensureAuthenticated as RequestHandler,
  ensureAdmin,
  uploadImages.array("images"),
  updatePropertyImagesController.handle
);

export { propertiesRoutes };
