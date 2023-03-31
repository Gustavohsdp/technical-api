import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

import { ResourceNotFoundError } from '@/use-cases/errors/resource-not-found-error'
import { makeFindByNameCategoryUseCase } from '@/use-cases/factories/category/make-find-by-name-category-use-case'

export async function findByName(request: FastifyRequest, reply: FastifyReply) {
  const findQuerySchema = z.object({
    name: z.string().email(),
  })

  const { name } = findQuerySchema.parse(request.query)

  const findByNameUseCase = makeFindByNameCategoryUseCase()

  try {
    const { category } = await findByNameUseCase.execute({
      name,
    })

    return reply.status(200).send(category)
  } catch (err) {
    if (err instanceof ResourceNotFoundError) {
      return reply.status(409).send({
        message: err.message,
      })
    }

    throw err
  }
}
