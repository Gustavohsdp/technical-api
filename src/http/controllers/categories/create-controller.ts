import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

import { CategoryAlreadyExistsError } from '@/use-cases/errors/category-already-exists-error'
import { makeCreateCategoryUseCase } from '@/use-cases/factories/category/make-create-category-use-case'

export async function create(request: FastifyRequest, reply: FastifyReply) {
  const createBodySchema = z.object({
    name: z.string(),
  })

  const { name } = createBodySchema.parse(request.body)

  try {
    const createUseCase = makeCreateCategoryUseCase()

    const { category } = await createUseCase.execute({
      name,
    })

    return reply.status(201).send(category)
  } catch (err) {
    if (err instanceof CategoryAlreadyExistsError) {
      return reply.status(409).send({
        message: err.message,
      })
    }

    throw err
  }
}
