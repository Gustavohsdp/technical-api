import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

import { makeFindAllOrdersCustomerUseCase } from '@/use-cases/factories/order/make-find-all-orders-customer-use-case'

export async function findAllOrdersCustomer(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const findParamsSchema = z.object({
    customerId: z.string(),
  })

  const { customerId } = findParamsSchema.parse(request.params)

  const findAllOrdersCustomerUseCase = makeFindAllOrdersCustomerUseCase()

  const { orders } = await findAllOrdersCustomerUseCase.execute({
    customerId,
  })

  return reply.status(200).send(orders)
}
