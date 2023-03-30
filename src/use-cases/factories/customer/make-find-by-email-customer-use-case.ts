import { PrismaCustomersRepository } from '@/repositories/prisma/prisma-customers-repository'
import { FindByEmailCustomerUseCase } from '@/use-cases/customer/find-by-email-customer-use-case'

export function makeFindByEmailCustomerUseCase() {
  const prismaRepository = new PrismaCustomersRepository()
  const useCase = new FindByEmailCustomerUseCase(prismaRepository)

  return useCase
}
