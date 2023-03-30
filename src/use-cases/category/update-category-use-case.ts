import { CategoriesRepository } from '@/repositories/categories-repository'
import { CategoryAlreadyExistsError } from '../errors/category-already-exists-error'

interface UpdateCategoryUseCaseRequest {
  categoryId: string

  name: string
}

interface UpdateCategoryUseCaseResponse {
  category:
    | {
        name: string
      }
    | undefined
}

export class UpdateCategoryUseCase {
  constructor(private categoriesRepository: CategoriesRepository) {}

  async execute({
    name,
    categoryId,
  }: UpdateCategoryUseCaseRequest): Promise<UpdateCategoryUseCaseResponse> {
    const categoryWithSameName = await this.categoriesRepository.findByName(
      name,
    )

    if (categoryWithSameName) {
      throw new CategoryAlreadyExistsError()
    }

    const category = await this.categoriesRepository.update(categoryId, {
      name,
    })

    return { category }
  }
}
