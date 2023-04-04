import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

import { makeUpdateOrderUseCase } from '@/use-cases/factories/order/make-update-order-use-case'

export async function update(request: FastifyRequest, reply: FastifyReply) {
  const updateBodySchema = z.object({
    customerId: z.string(),
    productIds: z.array(z.string()).min(1),
    totalValue: z.string(),
  })

  const updateParamsSchema = z.object({
    orderId: z.string(),
  })

  const { customerId, productIds, totalValue } = updateBodySchema.parse(
    request.body,
  )
  const { orderId } = updateParamsSchema.parse(request.params)

  const updateUseCase = makeUpdateOrderUseCase()

  const { order } = await updateUseCase.execute({
    customerId,
    orderId,
    productIds,
    totalValue,
  })

  return reply.status(200).send(order)
}
