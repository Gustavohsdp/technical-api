import { PrismaAdminsRepository } from '@/repositories/prisma/prisma-admins-repository'
import { UpdateAdminUseCase } from '@/use-cases/admin/update-admin-use-case'

export function makeUpdateAdminUseCase() {
  const prismaRepository = new PrismaAdminsRepository()
  const useCase = new UpdateAdminUseCase(prismaRepository)

  return useCase
}
