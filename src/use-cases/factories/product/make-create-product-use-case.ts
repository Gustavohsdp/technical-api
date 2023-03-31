import { PrismaProductsRepository } from '@/repositories/prisma/prisma-products-repository'
import { CreateProductUseCase } from '@/use-cases/product/create-product-use-case'

export function makeCreateProductUseCase() {
  const prismaRepository = new PrismaProductsRepository()
  const useCase = new CreateProductUseCase(prismaRepository)

  return useCase
}
