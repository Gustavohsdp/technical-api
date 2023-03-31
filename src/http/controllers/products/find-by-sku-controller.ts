import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

import { ResourceNotFoundError } from '@/use-cases/errors/resource-not-found-error'
import { makeFindBySkuProducUseCase } from '../../../use-cases/factories/product/make-find-by-sku-product-use-case'

export async function findBySku(request: FastifyRequest, reply: FastifyReply) {
  const findQuerySchema = z.object({
    sku: z.string(),
  })

  const { sku } = findQuerySchema.parse(request.query)

  const findBySkuUseCase = makeFindBySkuProducUseCase()

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
