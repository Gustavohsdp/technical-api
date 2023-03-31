import { PrismaOrdersRepository } from './../../../repositories/prisma/prisma-orders-repository'
import { FindAllOrderUseCase } from './../../order/find-all-order-use-case'

export function makeFindAllOrderUseCase() {
  const prismaRepository = new PrismaOrdersRepository()
  const useCase = new FindAllOrderUseCase(prismaRepository)

  return useCase
}
