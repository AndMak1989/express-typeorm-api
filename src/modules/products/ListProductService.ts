import RedisCache from "@config/redis";
import Product from '@shared/typeorm/entities/Product';
import { ProductRepository } from '@shared/typeorm/respositories/ProductsRepository';

import { getCustomRepository } from 'typeorm';

class ListProductService {
  public async execute(): Promise<Product[]> {
    const productsRepository = getCustomRepository(ProductRepository);
    const redisCache = new RedisCache();

    let products = await redisCache.recover<Product[]>(
      'PRODUCT_LIST',
    );

    if (!products) {
      products = await productsRepository.find();
      await redisCache.save('PRODUCT_LIST', products);
    }

    return products;
  }

}

export default ListProductService;
