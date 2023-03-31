import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

import { makeUpdateStatusProductUseCase } from '@/use-cases/factories/product/make-update-status-product-use-case'

export async function updateStatus(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const updateStatusBodySchema = z.object({
    status: z.boolean(),
  })

  const updateParamsSchema = z.object({
    productId: z.string(),
  })

  const { status } = updateStatusBodySchema.parse(request.body)
  const { productId } = updateParamsSchema.parse(request.params)

  const updateUseCase = makeUpdateStatusProductUseCase()

  const { product } = await updateUseCase.execute({
    status,
    productId,
  })

  return reply.status(201).send(product)
}
