import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

import { makeUpdateOrderUseCase } from '@/use-cases/factories/order/make-update-order-use-case'

export async function update(request: FastifyRequest, reply: FastifyReply) {
  const updateBodySchema = z.object({
    customerId: z.string(),
    productId: z.string(),
  })

  const updateParamsSchema = z.object({
    orderId: z.string(),
  })

  const { customerId, productId } = updateBodySchema.parse(request.body)
  const { orderId } = updateParamsSchema.parse(request.params)

  const updateUseCase = makeUpdateOrderUseCase()

  const { order } = await updateUseCase.execute({
    customerId,
    orderId,
    productId,
  })

  return reply.status(200).send(order)
}
