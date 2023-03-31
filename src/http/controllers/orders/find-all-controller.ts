import { FastifyReply, FastifyRequest } from 'fastify'

import { makeFindAllOrderUseCase } from '@/use-cases/factories/order/make-find-all-order-use-case'

export async function findAll(request: FastifyRequest, reply: FastifyReply) {
  const findAllUseCase = makeFindAllOrderUseCase()

  const { orders } = await findAllUseCase.execute()

  return reply.status(200).send(orders)
}
