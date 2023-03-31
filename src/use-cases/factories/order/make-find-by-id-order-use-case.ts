import { PrismaOrdersRepository } from './../../../repositories/prisma/prisma-orders-repository'
import { FindByIdOrderUseCase } from './../../order/find-by-id-order-use-case'

export function makeFindByIdOrderUseCase() {
  const prismaRepository = new PrismaOrdersRepository()
  const useCase = new FindByIdOrderUseCase(prismaRepository)

  return useCase
}
