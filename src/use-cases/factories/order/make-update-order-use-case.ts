import { PrismaOrdersRepository } from './../../../repositories/prisma/prisma-orders-repository'
import { UpdateOrderUseCase } from './../../order/update-order-use-case'

export function makeUpdateOrderUseCase() {
  const prismaRepository = new PrismaOrdersRepository()
  const useCase = new UpdateOrderUseCase(prismaRepository)

  return useCase
}
