import { PrismaCategoriesRepository } from '@/repositories/prisma/prisma-categories-repository'
import { UpdateCategoryUseCase } from '@/use-cases/category/update-category-use-case'

export function makeUpdateCategoryUseCase() {
  const prismaRepository = new PrismaCategoriesRepository()
  const useCase = new UpdateCategoryUseCase(prismaRepository)

  return useCase
}
