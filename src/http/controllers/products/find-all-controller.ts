import { FastifyReply, FastifyRequest } from 'fastify'

import { makeFindAllProductUseCase } from '@/use-cases/factories/product/make-find-all-product-use-case'

export async function findAll(request: FastifyRequest, reply: FastifyReply) {
  const findAllUseCase = makeFindAllProductUseCase()

  const { products } = await findAllUseCase.execute()

  return reply.status(200).send(products)
}
