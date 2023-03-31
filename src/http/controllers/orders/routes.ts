import { app } from '@/app'
import { verifyJWT } from '@/http/midlewares/verify-jwt'
import { cancelOrder } from './cancel-order-controller'
import { create } from './create-controller'
import { findAll } from './find-all-controller'
import { findById } from './find-by-id-controller'
import { update } from './update-controller'

export async function ordersRoutes() {
  app.addHook('onRequest', verifyJWT)

  app.post('/order', create)

  app.patch('/order/:orderId', update)
  app.patch('/order/cancel/:orderId', cancelOrder)

  app.get('/order/:orderId', findById)
  app.get('/order', findAll)
}
