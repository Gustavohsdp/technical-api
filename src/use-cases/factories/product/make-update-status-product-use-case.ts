import { PrismaProductsRepository } from '@/repositories/prisma/prisma-products-repository'
import { UpdateStatusProductUseCase } from '@/use-cases/product/update-status-product-use-case'

export function makeUpdateStatusProductUseCase() {
  const prismaRepository = new PrismaProductsRepository()
  const useCase = new UpdateStatusProductUseCase(prismaRepository)

  return useCase
}
