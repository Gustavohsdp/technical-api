import { PrismaProductsRepository } from '@/repositories/prisma/prisma-products-repository'
import { FindAllProductUseCase } from '@/use-cases/product/find-all-product-use-case'

export function makeFindAllProductUseCase() {
  const prismaRepository = new PrismaProductsRepository()
  const useCase = new FindAllProductUseCase(prismaRepository)

  return useCase
}
