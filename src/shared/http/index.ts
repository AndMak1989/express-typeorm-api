import passwordRouter from "@shared/routes/password.routes";
import { Router } from 'express';

import productsRouter from '@shared/routes/product.routes';
import sessionsRouter from "@shared/routes/sessions.routes";
import usersRouter from "@shared/routes/users.routes";
import profileRouter from '@shared/routes/profile.routes';
import customersRouter from '@shared/routes/customers.routes';
import ordersRouter from '@modules/orders/routes/orders.routes';

const routes = Router();
routes.use('/products', productsRouter);
routes.use('/users', usersRouter);
routes.use('/sessions', sessionsRouter);
routes.use('/password', passwordRouter);
routes.use('/profile', profileRouter);
routes.use('/customers', customersRouter);
routes.use('/orders', ordersRouter);

export default routes;
