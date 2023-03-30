import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

import { CustomerAlreadyExistsError } from '@/use-cases/errors/customer-already-exists-error'
import { makeCreateCustomerUseCase } from '@/use-cases/factories/customer/make-create-customer-use-case'

export async function create(request: FastifyRequest, reply: FastifyReply) {
  const createBodySchema = z.object({
    name: z.string(),
    email: z.string().email(),
    phone: z.string(),
    address: z.string(),
  })

  const { email, name, address, phone } = createBodySchema.parse(request.body)

  try {
    const createUseCase = makeCreateCustomerUseCase()

    const { customer } = await createUseCase.execute({
      email,
      name,
      address,
      phone,
    })

    return reply.status(201).send(customer)
  } catch (err) {
    if (err instanceof CustomerAlreadyExistsError) {
      return reply.status(409).send({
        message: err.message,
      })
    }

    throw err
  }
}
