import { Router } from "express";

import { categoriesRoutes } from "./categories.routes";
import { featuresRoutes } from "./features.routes";
import { propertiesRoutes } from "./propeties.routes";
import { usersRoutes } from "./users.routes";

const router = Router();

router.use("/categories", categoriesRoutes);

router.use("/features", featuresRoutes);

router.use("/users", usersRoutes);

router.use("/properties", propertiesRoutes);

export { router };
