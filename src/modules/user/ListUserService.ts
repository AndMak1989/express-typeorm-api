import User from '@shared/typeorm/entities/User';
import UsersRepository from '@shared/typeorm/respositories/UsersRepository';
import { getCustomRepository } from 'typeorm';

class ListUserService {
  public async execute(): Promise<User[]> {
    const usersRepository = getCustomRepository(UsersRepository);

    const users = usersRepository.find();
    console.log(users);
    return users;
  }
}

export default ListUserService;
