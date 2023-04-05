import { app } from '@/app'
import { authenticate } from './authenticate.controler'
import { create } from './create-controller'
import { findByEmail } from './find-by-email-controller'
import { refresh } from './refresh.controller'
import { update } from './update-controller'

export async function adminsRoutes() {
  app.post('/admin', create)

  app.post('/sessions', authenticate)
  app.patch('/token/refresh', refresh)

  app.patch('/admin/:adminId', update)

  app.get('/admin', findByEmail)
}
