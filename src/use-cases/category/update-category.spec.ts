import { InMemoryCategoriesRepository } from '@/repositories/in-memory/in-memory-categories-repository'
import { beforeEach, describe, expect, it } from 'vitest'
import { CategoryAlreadyExistsError } from '../errors/category-already-exists-error'
import { CreateCategoryUseCase } from './create-category-use-case'
import { UpdateCategoryUseCase } from './update-category-use-case'

let categoryRepository: InMemoryCategoriesRepository
let createCategory: CreateCategoryUseCase
let sut: UpdateCategoryUseCase

describe('Update Category Use Case', () => {
  beforeEach(() => {
    categoryRepository = new InMemoryCategoriesRepository()
    createCategory = new CreateCategoryUseCase(categoryRepository)
    sut = new UpdateCategoryUseCase(categoryRepository)
  })

  it('should not be able to update category with same name twice ', async () => {
    const name = 'Candy'

    await createCategory.execute({
      name,
    })

    const { category } = await createCategory.execute({
      name: 'Chocolate',
    })

    await expect(() =>
      sut.execute({
        categoryId: category.id,
        name,
      }),
    ).rejects.toBeInstanceOf(CategoryAlreadyExistsError)
  })

  it('should be able update category', async () => {
    const { category: categoryCreated } = await createCategory.execute({
      name: 'Candy',
    })

    const { category } = await sut.execute({
      categoryId: categoryCreated.id,
      name: 'Chocolate',
    })

    expect(category?.name).toEqual('Chocolate')
  })
})
