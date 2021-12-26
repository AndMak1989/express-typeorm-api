import { getCustomRepository } from 'typeorm';

import Customer from "@shared/typeorm/entities/Customer";
import CustomersRepository from "@shared/typeorm/respositories/CustomersRepository";

interface IPaginateCustomer {
  from: any;
  to: any;
  per_page: any;
  total: number | any;
  current_page: number;
  prev_page?: number | null;
  next_page?: number | null;
  last_page: number | null;
  data: Customer[] | any;
}

class ListCustomerService {
  public async execute(): Promise<IPaginateCustomer> {
    const customersRepository = getCustomRepository(CustomersRepository);

    const customers = await customersRepository.createQueryBuilder().paginate();

    return customers;
  }
}

export default ListCustomerService;
