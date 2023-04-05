import { app } from '@/app'
import { cancelOrder } from './cancel-order-controller'
import { create } from './create-controller'
import { findAll } from './find-all-controller'
import { findAllOrdersCustomer } from './find-all-orders-customer-controller'
import { findById } from './find-by-id-controller'
import { update } from './update-controller'

export async function ordersRoutes() {
  app.post('/order', create)

  app.patch('/order/:orderId', update)
  app.patch('/order/cancel/:orderId', cancelOrder)

  app.get('/order/:orderId', findById)
  app.get('/order/all/:customerId', findAllOrdersCustomer)
  app.get('/order', findAll)
}
