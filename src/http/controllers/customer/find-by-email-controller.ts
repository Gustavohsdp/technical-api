import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

import { ResourceNotFoundError } from '@/use-cases/errors/resource-not-found-error'
import { makeFindByEmailCustomerUseCase } from '@/use-cases/factories/customer/make-find-by-email-customer-use-case'

export async function findByEmail(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const createQuerySchema = z.object({
    email: z.string().email(),
  })

  const { email } = createQuerySchema.parse(request.query)

  const findByEmailUseCase = makeFindByEmailCustomerUseCase()

  try {
    const { customer } = await findByEmailUseCase.execute({
      email,
    })

    return reply.status(201).send(customer)
  } catch (err) {
    if (err instanceof ResourceNotFoundError) {
      return reply.status(409).send({
        message: err.message,
      })
    }

    throw err
  }
}
