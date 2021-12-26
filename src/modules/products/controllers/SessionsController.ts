import { Request, Response } from 'express';
import { classToClass } from 'class-transformer';

import CreateSessionsService from "@modules/products/CreateSessionsService";

export default class SessionsController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { email, password } = request.body;
    const createSession = new CreateSessionsService();

    const user = await createSession.execute({
      email,
      password,
    });

    return response.json(classToClass(user));
  }
}
