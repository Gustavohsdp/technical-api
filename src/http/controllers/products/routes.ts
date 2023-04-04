import { app } from '@/app'
import { create } from './create-controller'
import { findAll } from './find-all-controller'
import { findBySku } from './find-by-sku-controller'
import { update } from './update-controller'
import { updateStatus } from './update-status-controller'

export async function productsRoutes() {
  app.post('/product', create)

  app.patch('/product/:productId', update)
  app.patch('/product/status/:productId', updateStatus)

  app.get('/product/sku', findBySku)
  app.get('/product', findAll)
}
