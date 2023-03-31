import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

import { makeFindByIdOrderUseCase } from '@/use-cases/factories/order/make-find-by-id-order-use-case'

export async function findById(request: FastifyRequest, reply: FastifyReply) {
  const findParamsSchema = z.object({
    orderId: z.string(),
  })

  const { orderId } = findParamsSchema.parse(request.params)

  const findByIdUseCase = makeFindByIdOrderUseCase()

  const { order } = await findByIdUseCase.execute({
    orderId,
  })

  return reply.status(200).send(order)
}
