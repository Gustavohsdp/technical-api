import { PrismaCustomersRepository } from '@/repositories/prisma/prisma-customers-repository'
import { UpdateCustomerUseCase } from '@/use-cases/customer/update-customer-use-case'

export function makeUpdateCustomerUseCase() {
  const prismaRepository = new PrismaCustomersRepository()
  const useCase = new UpdateCustomerUseCase(prismaRepository)

  return useCase
}
