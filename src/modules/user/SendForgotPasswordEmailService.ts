import EtherealMail from "@config/email/EtherealMail";
import { getCustomRepository } from 'typeorm';
import path from 'path';

import AppError from '@shared/errors/AppError';
import UsersRepository from "@shared/typeorm/respositories/UsersRepository";
import UserTokensRepository from "@shared/typeorm/respositories/UserTokensRepository";

interface IRequest {
  email: string;
}

class SendForgotPasswordEmailService {
  public async execute({ email }: IRequest): Promise<void> {
    const usersRepository = getCustomRepository(UsersRepository);
    const userTokensRepository = getCustomRepository(UserTokensRepository);

    const user = await usersRepository.findByEmail(email)

    if (!user) {
      throw new AppError('User does not exists.');
    }

    const { token } = await userTokensRepository.generate(user.id);
    console.log(token);
    const forgotPasswordTemplate = path.resolve(
      __dirname,
      '..',
      'shared',
      'views',
      'forgot_password.hbs',
    );

    await EtherealMail.sendMail({
      to: {
        name: user.name,
        email: user.email,
      },
      subject: 'Reset Password',
      templateData: {
        file: forgotPasswordTemplate,
        variables: {
          name: user.name,
          link: `${process.env.APP_WEB_URL}/reset_password?token=${token}`,
        },
      },
    });
  }
}

export default SendForgotPasswordEmailService;
