import { PrismaOrdersRepository } from './../../../repositories/prisma/prisma-orders-repository'
import { CreateOrderUseCase } from './../../order/create-order-use-case'

export function makeCreateOrderUseCase() {
  const prismaRepository = new PrismaOrdersRepository()
  const useCase = new CreateOrderUseCase(prismaRepository)

  return useCase
}
