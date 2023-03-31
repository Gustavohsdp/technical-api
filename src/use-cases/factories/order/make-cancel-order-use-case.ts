import { PrismaOrdersRepository } from './../../../repositories/prisma/prisma-orders-repository'
import { CancelOrderUseCase } from './../../order/cancel-order-use-case'

export function makeCancelOrderUseCase() {
  const prismaRepository = new PrismaOrdersRepository()
  const useCase = new CancelOrderUseCase(prismaRepository)

  return useCase
}
