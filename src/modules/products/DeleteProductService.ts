import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import RedisCache from '@config/redis';
import { ProductRepository } from '@shared/typeorm/respositories/ProductsRepository';

interface IRequest {
  id: string;
}

class DeleteProductService {
  public async execute({ id }: IRequest): Promise<void> {
    const productsRepository = getCustomRepository(ProductRepository);

    const product = await productsRepository.findOne(id);

    if (!product) {
      throw new AppError('Product not found.');
    }

    const redisCache = new RedisCache();

    await redisCache.invalidate('PRODUCT_LIST');

    await productsRepository.remove(product);
  }
}

export default DeleteProductService;
