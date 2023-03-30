import { PrismaAdminsRepository } from '@/repositories/prisma/prisma-admins-repository'
import { AuthenticateUseCase } from '@/use-cases/authenticate/authenticate-use-case'

export function makeAuthenticateUseCase() {
  const prismaRepository = new PrismaAdminsRepository()
  const authenticateUseCase = new AuthenticateUseCase(prismaRepository)

  return authenticateUseCase
}
