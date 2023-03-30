import { InMemoryCategoriesRepository } from '@/repositories/in-memory/in-memory-categories-repository'
import { beforeEach, describe, expect, it } from 'vitest'
import { CreateCategoryUseCase } from './create-category-use-case'
import { FindAllCategoryUseCase } from './find-all-category-use-case'

let categoryRepository: InMemoryCategoriesRepository
let createCategory: CreateCategoryUseCase
let sut: FindAllCategoryUseCase

describe('Find All Category Use Case', () => {
  beforeEach(() => {
    categoryRepository = new InMemoryCategoriesRepository()
    createCategory = new CreateCategoryUseCase(categoryRepository)
    sut = new FindAllCategoryUseCase(categoryRepository)
  })

  it('should be able find all categories', async () => {
    await createCategory.execute({
      name: 'Candy',
    })

    await createCategory.execute({
      name: 'Chocolate',
    })

    const { categories } = await sut.execute()

    expect(categories).toHaveLength(2)
    expect(categories).toEqual([
      expect.objectContaining({
        name: 'Candy',
      }),
      expect.objectContaining({
        name: 'Chocolate',
      }),
    ])
  })
})
