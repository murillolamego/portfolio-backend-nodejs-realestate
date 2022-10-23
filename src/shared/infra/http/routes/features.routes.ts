import { RequestHandler, Router } from "express";

import { CreateFeatureController } from "@modules/properties/useCases/createFeature/CreateFeatureController";
import { ListFeaturesController } from "@modules/properties/useCases/listFeatures/ListFeaturesController";

import { ensureAdmin } from "../middlewares/ensureAdmin";
import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";

const featuresRoutes = Router();

const createFeatureController = new CreateFeatureController();

const listFeaturesController = new ListFeaturesController();

featuresRoutes.post(
  "/",
  ensureAuthenticated as RequestHandler,
  ensureAdmin,
  createFeatureController.handle as RequestHandler
);

featuresRoutes.get(
  "/",
  ensureAuthenticated as RequestHandler,
  listFeaturesController.handle as RequestHandler
);

export { featuresRoutes };
