import { RequestHandler, Router } from "express";
import multer from "multer";

import { CreateCategoryController } from "@modules/properties/useCases/createCategory/CreateCategoryController";
import { DeleteCategoryController } from "@modules/properties/useCases/deleteCategory/DeleteCategoryController";
import { ImportCategoryController } from "@modules/properties/useCases/importCategory/ImportCategoryController";
import { ListCategoriesController } from "@modules/properties/useCases/listCategories/ListCategoriesController";

import { ensureAdmin } from "../middlewares/ensureAdmin";
import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";

const categoriesRoutes = Router();

const upload = multer({
  dest: "./tmp",
});

const createCategoryController = new CreateCategoryController();
const listCategoriesController = new ListCategoriesController();
const importCategoryController = new ImportCategoryController();
const deleteCategoryController = new DeleteCategoryController();

categoriesRoutes.get(
  "/",
  ensureAuthenticated as RequestHandler,
  listCategoriesController.handle as RequestHandler
);

categoriesRoutes.post(
  "/",
  ensureAuthenticated as RequestHandler,
  ensureAdmin,
  createCategoryController.handle as RequestHandler
);

categoriesRoutes.post(
  "/import",
  ensureAuthenticated as RequestHandler,
  ensureAdmin,
  upload.single("file"),
  importCategoryController.handle
);

categoriesRoutes.delete(
  "/:categoryId",
  ensureAuthenticated as RequestHandler,
  ensureAdmin,
  deleteCategoryController.handle as RequestHandler
);

export { categoriesRoutes };
