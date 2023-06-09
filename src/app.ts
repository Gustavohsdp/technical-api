import fastifyCookie from '@fastify/cookie'
import cors from '@fastify/cors'
import fastifyJwt from '@fastify/jwt'
import fastify from 'fastify'
import { ZodError } from 'zod'
import { env } from './env'
import { adminsRoutes } from './http/controllers/admins/routes'
import { categoriesRoutes } from './http/controllers/categories/routes'
import { customersRoutes } from './http/controllers/customer/routes'
import { ordersRoutes } from './http/controllers/orders/routes'
import { productsRoutes } from './http/controllers/products/routes'

export const app = fastify()

app.register(cors)

app.register(fastifyJwt, {
  secret: env.JWT_SECRET,
  cookie: {
    cookieName: 'refreshToken',
    signed: false,
  },
  sign: {
    expiresIn: '7d',
  },
})

app.register(fastifyCookie)

app.register(adminsRoutes)
app.register(customersRoutes)
app.register(categoriesRoutes)
app.register(productsRoutes)
app.register(ordersRoutes)

app.get('/', async (request, reply) => {
  return 'Hello World'
})

app.setErrorHandler((error, _request, reply) => {
  if (error instanceof ZodError) {
    return reply
      .status(400)
      .send({ message: 'Validation error.', issues: error.format() })
  }

  if (env.NODE_ENV !== 'production') {
    console.error(error)
  } else {
    // TODO: Here we should log to an external tool like DataDog/NewRelic/Sentry...
  }

  return reply.status(500).send({ message: 'Internal server error' })
})
