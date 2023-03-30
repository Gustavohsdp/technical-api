import { PrismaCustomersRepository } from '@/repositories/prisma/prisma-customers-repository'
import { CreateCustomerUseCase } from '@/use-cases/customer/create-customer-use-case'

export function makeCreateCustomerUseCase() {
  const prismaRepository = new PrismaCustomersRepository()
  const useCase = new CreateCustomerUseCase(prismaRepository)

  return useCase
}
