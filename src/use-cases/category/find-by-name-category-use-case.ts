import { CategoriesRepository } from '@/repositories/categories-repository'
import { Category } from '@prisma/client'
import { ResourceNotFoundError } from '../errors/resource-not-found-error'

interface FindByNameCategoryUseCaseRequest {
  name: string
}

interface FindByNameCategoryUseCaseResponse {
  category: Category
}

export class FindByNameCategoryUseCase {
  constructor(private categoriesRepository: CategoriesRepository) {}

  async execute({
    name,
  }: FindByNameCategoryUseCaseRequest): Promise<FindByNameCategoryUseCaseResponse> {
    const category = await this.categoriesRepository.findByName(name)

    if (!category) {
      throw new ResourceNotFoundError()
    }

    return { category }
  }
}
