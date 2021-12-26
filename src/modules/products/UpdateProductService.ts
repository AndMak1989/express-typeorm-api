import RedisCache from "@config/redis";
import AppError from '@shared/errors/AppError';
import Product from "@shared/typeorm/entities/Product";
import { ProductRepository } from '@shared/typeorm/respositories/ProductsRepository';

import { getCustomRepository } from 'typeorm';

interface IProductRequest {
  id: string;
  name: string;
  price: number;
  quantity: number;
}
class UpdateProductService {
  public async execute( data: IProductRequest): Promise<Product> {
    const productsRepository = getCustomRepository(ProductRepository);
    const product = await productsRepository.findOne(data.id);

    if (!product) {
      throw new AppError('Product not found!');
    }

    const productExists = await productsRepository.findByName(data.name)

    if (!productExists) {
      throw new AppError('Product exists!');
    }

    const redisCache = new RedisCache();

    await redisCache.invalidate('api-vendas-PRODUCT_LIST');

    product.name = data.name;
    product.price = data.price;
    product.quantity = data.quantity;

    await productsRepository.save(product);

    return product;
  }
}


export default UpdateProductService;
