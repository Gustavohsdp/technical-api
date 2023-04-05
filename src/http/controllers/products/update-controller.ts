import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

import { ProductAlreadyExistsError } from '@/use-cases/errors/product-already-exists-errot'
import { makeUpdateProductUseCase } from '@/use-cases/factories/product/make-update-product-use-case'

export async function update(request: FastifyRequest, reply: FastifyReply) {
  const updateBodySchema = z.object({
    name: z.string(),
    description: z.string(),
    sku: z.string().optional(),
    unitaryValue: z.string(),
    active: z.boolean(),
    categoryId: z.string(),
    imageUrl: z.string().optional(),
  })

  const updateParamsSchema = z.object({
    productId: z.string(),
  })

  const { active, categoryId, description, name, sku, unitaryValue, imageUrl } =
    updateBodySchema.parse(request.body)
  const { productId } = updateParamsSchema.parse(request.params)

  const updateUseCase = makeUpdateProductUseCase()

  try {
    const { product } = await updateUseCase.execute({
      active,
      categoryId,
      description,
      name,
      sku: sku ?? undefined,
      imageUrl: imageUrl ?? undefined,
      unitaryValue,
      productId,
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
