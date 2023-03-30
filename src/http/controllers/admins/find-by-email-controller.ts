import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

import { makeFindByEmailAdminUseCase } from '@/use-cases/factories/admin/make-find-by-email-admin-use-case'

export async function findByEmail(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const createQuerySchema = z.object({
    email: z.string().email(),
  })

  const { email } = createQuerySchema.parse(request.query)

  const findByEmailUseCase = makeFindByEmailAdminUseCase()

  const { admin } = await findByEmailUseCase.execute({
    email,
  })

  return reply.status(201).send(admin)
}
