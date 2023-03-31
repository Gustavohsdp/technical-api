import { PrismaProductsRepository } from '@/repositories/prisma/prisma-products-repository'
import { FindBySkuProductUseCase } from '@/use-cases/product/find-by-sku-product-use-case'

export function makeFindBySkuProducUseCase() {
  const prismaRepository = new PrismaProductsRepository()
  const useCase = new FindBySkuProductUseCase(prismaRepository)

  return useCase
}
