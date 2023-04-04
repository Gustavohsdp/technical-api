import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

import { makeCreateOrderUseCase } from '@/use-cases/factories/order/make-create-order-use-case'

export async function create(request: FastifyRequest, reply: FastifyReply) {
  const createBodySchema = z.object({
    customerId: z.string(),
    productIds: z.array(z.string()).min(1),
    totalValue: z.string(),
  })

  const { customerId, productIds, totalValue } = createBodySchema.parse(
    request.body,
  )

  const createUseCase = makeCreateOrderUseCase()

  const { order } = await createUseCase.execute({
    customerId,
    productIds,
    totalValue,
  })

  return reply.status(201).send(order)
}
