import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

import { makeCancelOrderUseCase } from '@/use-cases/factories/order/make-cancel-order-use-case'

export async function cancelOrder(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const cancelOrderParamsSchema = z.object({
    orderId: z.string(),
  })

  const { orderId } = cancelOrderParamsSchema.parse(request.params)

  const updateUseCase = makeCancelOrderUseCase()

  const { order } = await updateUseCase.execute({
    orderId,
  })

  return reply.status(200).send(order)
}
