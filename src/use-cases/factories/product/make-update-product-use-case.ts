import { PrismaProductsRepository } from '@/repositories/prisma/prisma-products-repository'
import { UpdateProductUseCase } from '@/use-cases/product/update-product-use-case'

export function makeUpdateProductUseCase() {
  const prismaRepository = new PrismaProductsRepository()
  const useCase = new UpdateProductUseCase(prismaRepository)

  return useCase
}
