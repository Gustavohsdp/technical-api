import { PrismaCategoriesRepository } from '@/repositories/prisma/prisma-categories-repository'
import { FindAllCategoryUseCase } from '@/use-cases/category/find-all-category-use-case'

export function makeFindAllCategoriesUseCase() {
  const prismaRepository = new PrismaCategoriesRepository()
  const useCase = new FindAllCategoryUseCase(prismaRepository)

  return useCase
}
