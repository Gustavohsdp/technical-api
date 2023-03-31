import { FastifyReply, FastifyRequest } from 'fastify'

import { makeFindAllCategoriesUseCase } from '@/use-cases/factories/category/make-find-all-category-use-case'

export async function findAll(request: FastifyRequest, reply: FastifyReply) {
  const findAllUseCase = makeFindAllCategoriesUseCase()

  const { categories } = await findAllUseCase.execute()

  return reply.status(200).send(categories)
}
