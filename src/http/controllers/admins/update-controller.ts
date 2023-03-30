import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

import { makeUpdateAdminUseCase } from '@/use-cases/factories/admin/make-update-admin-use-case'

export async function update(request: FastifyRequest, reply: FastifyReply) {
  const updateBodySchema = z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string(),
  })

  const updateParamsSchema = z.object({
    adminId: z.string(),
  })

  const { email, name, password } = updateBodySchema.parse(request.body)
  const { adminId } = updateParamsSchema.parse(request.params)

  const updateUseCase = makeUpdateAdminUseCase()

  const { admin } = await updateUseCase.execute({
    adminId,
    email,
    name,
    password,
  })

  return reply.status(201).send(admin)
}
