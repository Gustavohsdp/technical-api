import { PrismaAdminsRepository } from '@/repositories/prisma/prisma-admins-repository'
import { FindByEmailAdminUseCase } from '@/use-cases/admin/find-by-email-admin-use-case'

export function makeFindByEmailAdminUseCase() {
  const prismaRepository = new PrismaAdminsRepository()
  const useCase = new FindByEmailAdminUseCase(prismaRepository)

  return useCase
}
