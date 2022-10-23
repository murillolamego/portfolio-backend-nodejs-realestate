import { RequestHandler, Router } from "express";
import multer from "multer";

import { AuthenticateUserController } from "@modules/accounts/useCases/authenticateUser/AuthenticateUserController";
import { CreateUserController } from "@modules/accounts/useCases/createUser/CreateUserController";
import { DeleteUserController } from "@modules/accounts/useCases/deleteUser/DeleteUserController";
import { ReauthenticateUserController } from "@modules/accounts/useCases/reauthenticateUser/ReauthenticateUserController";
import { RecoverPasswordByEmailController } from "@modules/accounts/useCases/recoverUserPasswordByEmail/RecoverPasswordByEmailController";
import { ResetUserPasswordController } from "@modules/accounts/useCases/resetUserPassword/ResetUserPasswordController";
import { UpdateUserController } from "@modules/accounts/useCases/updateUser/UpdateUserController";
import { UpdateUserAvatarController } from "@modules/accounts/useCases/updateUserAvatar/UpdateUserAvatarController";
import { ensureAuthenticated } from "@shared/infra/http/middlewares/ensureAuthenticated";

import uploadConfig from "../../../../config/upload";

const usersRoutes = Router();

const uploadAvatar = multer(uploadConfig);

const createUserController = new CreateUserController();

const updateUserController = new UpdateUserController();

const updateUserAvatarController = new UpdateUserAvatarController();

const deleteUserController = new DeleteUserController();

const authenticateUserController = new AuthenticateUserController();

const reauthenticateUserController = new ReauthenticateUserController();

const recoverPasswordByEmailController = new RecoverPasswordByEmailController();

const resetUserPasswordController = new ResetUserPasswordController();

usersRoutes.post("/", createUserController.handle as RequestHandler);

usersRoutes.post("/auth", authenticateUserController.handle as RequestHandler);

usersRoutes.post(
  "/reauth",
  reauthenticateUserController.handle as RequestHandler
);

usersRoutes.post(
  "/password/recover",
  recoverPasswordByEmailController.handle as RequestHandler
);

usersRoutes.post(
  "/password/reset",
  resetUserPasswordController.handle as RequestHandler
);

usersRoutes.patch(
  "/avatar",
  ensureAuthenticated as RequestHandler,
  uploadAvatar.single("avatar"),
  updateUserAvatarController.handle as RequestHandler
);

usersRoutes.patch(
  "/:userId",
  ensureAuthenticated as RequestHandler,
  updateUserController.handle as RequestHandler
);

usersRoutes.delete(
  "/:userId",
  ensureAuthenticated as RequestHandler,
  deleteUserController.handle as RequestHandler
);

export { usersRoutes };
