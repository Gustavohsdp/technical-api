import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

import { CategoryAlreadyExistsError } from '@/use-cases/errors/category-already-exists-error'
import { makeUpdateCategoryUseCase } from '@/use-cases/factories/category/make-update-category-use-case'

export async function update(request: FastifyRequest, reply: FastifyReply) {
  const updateBodySchema = z.object({
    name: z.string(),
  })

  const updateParamsSchema = z.object({
    categoryId: z.string(),
  })

  const { name } = updateBodySchema.parse(request.body)
  const { categoryId } = updateParamsSchema.parse(request.params)

  const updateUseCase = makeUpdateCategoryUseCase()

  try {
    const { category } = await updateUseCase.execute({
      name,
      categoryId,
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
