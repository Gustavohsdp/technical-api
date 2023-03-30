import { PrismaCategoriesRepository } from '@/repositories/prisma/prisma-categories-repository'
import { CreateCategoryUseCase } from '@/use-cases/category/create-category-use-case'

export function makeCreateCategoryUseCase() {
  const prismaRepository = new PrismaCategoriesRepository()
  const useCase = new CreateCategoryUseCase(prismaRepository)

  return useCase
}
