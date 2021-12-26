import OrdersProducts from "../entities/OrderProducts";
import {
  Column,
  CreateDateColumn,
  Entity, OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('products')
class Product {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column('decimal')
  price: number;

  @Column('int')
  quantity: number;

  @CreateDateColumn()
  created_at: Date;

  @OneToMany(() => OrdersProducts, order_products => order_products.product)
  order_products: OrdersProducts[];

  @UpdateDateColumn()
  updated_at: Date;
}

export default Product;
