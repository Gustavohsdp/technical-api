import { FindAllOrdersCustomerUseCase } from '@/use-cases/order/find-all-orders-customer-use-case'
import { PrismaOrdersRepository } from './../../../repositories/prisma/prisma-orders-repository'

export function makeFindAllOrdersCustomerUseCase() {
  const prismaRepository = new PrismaOrdersRepository()
  const useCase = new FindAllOrdersCustomerUseCase(prismaRepository)

  return useCase
}
