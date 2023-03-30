import { InMemoryCategoriesRepository } from '@/repositories/in-memory/in-memory-categories-repository'
import { beforeEach, describe, expect, it } from 'vitest'
import { ResourceNotFoundError } from '../errors/resource-not-found-error'
import { CreateCategoryUseCase } from './create-category-use-case'
import { FindByNameCategoryUseCase } from './find-by-name-category-use-case'

let categoryRepository: InMemoryCategoriesRepository
let createCategory: CreateCategoryUseCase
let sut: FindByNameCategoryUseCase

describe('Find By Name Category Use Case', () => {
  beforeEach(() => {
    categoryRepository = new InMemoryCategoriesRepository()
    createCategory = new CreateCategoryUseCase(categoryRepository)
    sut = new FindByNameCategoryUseCase(categoryRepository)
  })

  it('should not be able to find an category with invalid name', async () => {
    const name = 'Candy'

    await createCategory.execute({
      name,
    })

    await expect(() =>
      sut.execute({
        name: 'Chocolate',
      }),
    ).rejects.toBeInstanceOf(ResourceNotFoundError)
  })

  it('should be able find category by name', async () => {
    const name = 'Candy'

    await createCategory.execute({
      name,
    })

    const { category } = await sut.execute({
      name,
    })

    expect(category?.name).toEqual(name)
  })
})
