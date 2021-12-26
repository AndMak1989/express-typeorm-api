import AppError from '@shared/errors/AppError';
import RedisCache from '@config/redis';
import Product from '@shared/typeorm/entities/Product';
import { ProductRepository } from '@shared/typeorm/respositories/ProductsRepository';

import { getCustomRepository } from 'typeorm';

interface IProductRequest {
  name: string;
  price: number;
  quantity: number;
}

class CreateProductService {
  public async execute(data: IProductRequest): Promise<Product> {
    const productsRepository = getCustomRepository(ProductRepository);
    const productExists = await productsRepository.findByName(data.name);
    const redisCache = new RedisCache();
    if (productExists) {
      throw new AppError('Product already existed');
    }
    const product = productsRepository.create({
      ...data,
    });

    await redisCache.invalidate('PRODUCT_LIST');

    await productsRepository.save(product);

    return product;
  }
}

export default CreateProductService;
