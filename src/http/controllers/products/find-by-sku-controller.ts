import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

import { ResourceNotFoundError } from '@/use-cases/errors/resource-not-found-error'
import { makeFindBySkuProductUseCase } from '@/use-cases/factories/product/make-find-by-sku-product-use-case'

export async function findBySku(request: FastifyRequest, reply: FastifyReply) {
  const findParamsSchema = z.object({
    sku: z.string(),
  })

  const { sku } = findParamsSchema.parse(request.params)

  const findBySkuUseCase = makeFindBySkuProductUseCase()

  try {
    const { product } = await findBySkuUseCase.execute({
      sku,
    })

    return reply.status(201).send(product)
  } catch (err) {
    if (err instanceof ResourceNotFoundError) {
      return reply.status(409).send({
        message: err.message,
      })
    }

    throw err
  }
}
