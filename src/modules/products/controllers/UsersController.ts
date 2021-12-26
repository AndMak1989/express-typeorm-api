import { Request, Response } from 'express';
import { hash } from 'bcryptjs';
import { classToClass } from 'class-transformer';

import CreateUserService from '@modules/user/CreateUserService';
import ListUserService from '@modules/user/ListUserService';

export default class UsersController {
  public async index(request: Request, response: Response): Promise<Response> {
    const listUser = new ListUserService();
    const users = await listUser.execute();

    return response.json(classToClass(users));
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const { name, email, password } = request.body;
    const createUser = new CreateUserService();
    const hashedPassword = await hash(password, 8);
    const user = await createUser.execute({
      name,
      email,
      password: hashedPassword,
    });

    return response.json(classToClass(user));
  }
}
