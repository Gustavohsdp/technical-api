import { app } from '@/app'
import { create } from './create-controller'
import { findAll } from './find-all-controller'
import { findByName } from './find-by-name-controller'
import { update } from './update-controller'

export async function categoriesRoutes() {
  // app.addHook('onRequest', verifyJWT)

  app.post('/category', create)

  app.patch('/category/:categoryId', update)

  app.get('/category/name', findByName)

  app.get('/category', findAll)
}
