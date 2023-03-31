import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

import { ProductAlreadyExistsError } from '@/use-cases/errors/product-already-exists-errot'
import { makeCreateProductUseCase } from '@/use-cases/factories/product/make-create-product-use-case'

export async function create(request: FastifyRequest, reply: FastifyReply) {
  const createBodySchema = z.object({
    name: z.string(),
    description: z.string(),
    sku: z.string(),
    unitaryValue: z.number(),
    active: z.boolean(),
    categoryId: z.string(),
  })

  const { active, categoryId, description, name, sku, unitaryValue } =
    createBodySchema.parse(request.body)

  try {
    const createUseCase = makeCreateProductUseCase()

    const { product } = await createUseCase.execute({
      active,
      categoryId,
      description,
      name,
      sku,
      unitaryValue,
    })

    return reply.status(201).send(product)
  } catch (err) {
    if (err instanceof ProductAlreadyExistsError) {
      return reply.status(409).send({
        message: err.message,
      })
    }

    throw err
  }
}
