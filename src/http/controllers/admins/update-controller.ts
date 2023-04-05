import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

import { AdminAlreadyExistsError } from '@/use-cases/errors/admin-already-exists-error'
import { makeUpdateAdminUseCase } from '@/use-cases/factories/admin/make-update-admin-use-case'

export async function update(request: FastifyRequest, reply: FastifyReply) {
  const updateBodySchema = z.object({
    name: z.string().optional(),
    email: z.string().email().optional(),
    password: z.string().optional(),
  })

  const updateParamsSchema = z.object({
    adminId: z.string(),
  })

  const { email, name, password } = updateBodySchema.parse(request.body)
  const { adminId } = updateParamsSchema.parse(request.params)

  const updateUseCase = makeUpdateAdminUseCase()

  try {
    const { admin } = await updateUseCase.execute({
      adminId,
      email: email ?? undefined,
      name: name ?? undefined,
      password: password ?? undefined,
    })

    return reply.status(200).send(admin)
  } catch (err) {
    if (err instanceof AdminAlreadyExistsError) {
      return reply.status(409).send({
        message: err.message,
      })
    }

    throw err
  }
}
