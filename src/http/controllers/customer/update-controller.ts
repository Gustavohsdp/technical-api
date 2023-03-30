import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

import { CustomerAlreadyExistsError } from '@/use-cases/errors/customer-already-exists-error'
import { makeUpdateCustomerUseCase } from '@/use-cases/factories/customer/make-update-customer-use-case'

export async function update(request: FastifyRequest, reply: FastifyReply) {
  const updateBodySchema = z.object({
    name: z.string(),
    email: z.string().email(),
    phone: z.string(),
    address: z.string(),
  })

  const updateParamsSchema = z.object({
    customerId: z.string(),
  })

  const { email, name, address, phone } = updateBodySchema.parse(request.body)
  const { customerId } = updateParamsSchema.parse(request.params)

  const updateUseCase = makeUpdateCustomerUseCase()

  try {
    const { customer } = await updateUseCase.execute({
      customerId,
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
