import { PrismaCategoriesRepository } from '@/repositories/prisma/prisma-categories-repository'
import { FindByNameCategoryUseCase } from '@/use-cases/category/find-by-name-category-use-case'

export function makeFindByNameCategoryUseCase() {
  const prismaRepository = new PrismaCategoriesRepository()
  const useCase = new FindByNameCategoryUseCase(prismaRepository)

  return useCase
}
