import { app } from '@/app'
import { verifyJWT } from '@/http/midlewares/verify-jwt'
import { create } from './create-controller'
import { findByEmail } from './find-by-email-controller'
import { update } from './update-controller'

export async function customersRoutes() {
  app.addHook('onRequest', verifyJWT)

  app.post('/customer', create)

  app.patch('/customer/:customerId', update)

  app.get('/customer', findByEmail)
}
