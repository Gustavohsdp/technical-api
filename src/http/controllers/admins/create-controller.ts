import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

import { makeCreateAdminUseCase } from '@/use-cases/factories/admin/make-create-admin-use-case copy'

export async function create(request: FastifyRequest, reply: FastifyReply) {
  const createBodySchema = z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string(),
  })

  const { email, name, password } = createBodySchema.parse(request.body)

  const createUseCase = makeCreateAdminUseCase()

  const { admin } = await createUseCase.execute({
    email,
    name,
    password,
  })

  return reply.status(201).send(admin)
}
