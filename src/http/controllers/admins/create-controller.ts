import { AdminAlreadyExistsError } from '@/use-cases/errors/admin-already-exists-error'
import { makeCreateAdminUseCase } from '@/use-cases/factories/admin/make-create-admin-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function create(request: FastifyRequest, reply: FastifyReply) {
  const createBodySchema = z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string(),
  })

  const { email, name, password } = createBodySchema.parse(request.body)

  try {
    const createUseCase = makeCreateAdminUseCase()

    const { admin } = await createUseCase.execute({
      email,
      name,
      password,
    })

    return reply.status(201).send(admin)
  } catch (err) {
    if (err instanceof AdminAlreadyExistsError) {
      return reply.status(409).send({
        message: err.message,
      })
    }

    throw err
  }
}
