import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

import { ResourceNotFoundError } from '@/use-cases/errors/resource-not-found-error'
import { makeFindByEmailAdminUseCase } from '@/use-cases/factories/admin/make-find-by-email-admin-use-case'

export async function findByEmail(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const findQuerySchema = z.object({
    email: z.string().email(),
  })

  const { email } = findQuerySchema.parse(request.query)

  const findByEmailUseCase = makeFindByEmailAdminUseCase()

  try {
    const { admin } = await findByEmailUseCase.execute({
      email,
    })

    return reply.status(200).send(admin)
  } catch (err) {
    if (err instanceof ResourceNotFoundError) {
      return reply.status(409).send({
        message: err.message,
      })
    }

    throw err
  }
}
