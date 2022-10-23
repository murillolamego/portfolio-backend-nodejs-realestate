import { resolve } from "path";
import { inject, injectable } from "tsyringe";
import { v4 as uuidV4 } from "uuid";

import { IUsersRepository } from "@modules/accounts/repositories/IUsersRepository";
import { IUserTokensRepository } from "@modules/accounts/repositories/IUserTokensRepository";
import { IDateProvider } from "@shared/container/providers/DateProvider/IDateProvider";
import { IMailProvider } from "@shared/container/providers/MailProvider/IMailProvider";
import { AppError } from "@shared/errors/AppError";

@injectable()
class RecoverPasswordByEmailUseCase {
  constructor(
    @inject("UsersRepository")
    private readonly usersRepository: IUsersRepository,
    @inject("UserTokensRepository")
    private readonly userTokensRepository: IUserTokensRepository,
    @inject("DayJsDateProvider")
    private readonly dayJsDateProvider: IDateProvider,
    @inject("EtherealMailProvider")
    private readonly etherealMailProvider: IMailProvider
  ) {}

  async execute(email: string): Promise<void> {
    const user = await this.usersRepository.findByEmail(email);

    if (!user) {
      throw new AppError("Invalid email provided");
    }

    const templatePath = resolve(
      __dirname,
      "..",
      "..",
      "views",
      "emails",
      "recoverPassword.hbs"
    );

    const token = uuidV4();
    const expires = this.dayJsDateProvider.addHours(3);

    await this.userTokensRepository.create({
      refreshToken: token,
      userId: user.id,
      expires,
    });

    const variables = {
      name: user.name,
      link: `${process.env.RECOVER_PASSWORD_URL}${token}`,
    };

    await this.etherealMailProvider.sendMail(
      email,
      "Password Recovery",
      variables,
      templatePath
    );
  }
}

export { RecoverPasswordByEmailUseCase };
