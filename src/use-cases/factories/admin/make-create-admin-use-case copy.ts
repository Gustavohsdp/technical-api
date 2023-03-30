import { PrismaAdminsRepository } from '@/repositories/prisma/prisma-admins-repository'
import { CreateAdminUseCase } from '@/use-cases/admin/create-admin-use-case'

export function makeCreateAdminUseCase() {
  const prismaRepository = new PrismaAdminsRepository()
  const useCase = new CreateAdminUseCase(prismaRepository)

  return useCase
}
