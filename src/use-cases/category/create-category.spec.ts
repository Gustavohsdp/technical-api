import { InMemoryCategoriesRepository } from '@/repositories/in-memory/in-memory-categories-repository'
import { beforeEach, describe, expect, it } from 'vitest'
import { CategoryAlreadyExistsError } from '../errors/category-already-exists-error'
import { CreateCategoryUseCase } from './create-category-use-case'

let categoryRepository: InMemoryCategoriesRepository
let sut: CreateCategoryUseCase

describe('Create Category Use Case', () => {
  beforeEach(() => {
    categoryRepository = new InMemoryCategoriesRepository()
    sut = new CreateCategoryUseCase(categoryRepository)
  })

  it('should be able to create category', async () => {
    const { category } = await sut.execute({
      name: 'Candy',
    })

    expect(category.id).toEqual(expect.any(String))
  })

  it('should not be able to create category with same name twice ', async () => {
    const name = 'candy'

    await sut.execute({
      name,
    })

    await expect(() =>
      sut.execute({
        name,
      }),
    ).rejects.toBeInstanceOf(CategoryAlreadyExistsError)
  })
})
