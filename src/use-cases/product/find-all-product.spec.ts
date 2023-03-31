import { InMemoryProductsRepository } from '@/repositories/in-memory/in-memory-products-repository'
import { beforeEach, describe, expect, it } from 'vitest'
import { CreateProductUseCase } from './create-product-use-case'
import { FindAllProductUseCase } from './find-all-product-use-case'

let productRepository: InMemoryProductsRepository
let createProduct: CreateProductUseCase
let sut: FindAllProductUseCase

describe('Find All Product Use Case', () => {
  beforeEach(() => {
    productRepository = new InMemoryProductsRepository()
    createProduct = new CreateProductUseCase(productRepository)
    sut = new FindAllProductUseCase(productRepository)
  })

  it('should be able find all categories', async () => {
    await createProduct.execute({
      active: true,
      description: 'Product description',
      name: 'Product Name',
      sku: 'pnsku',
      unitaryValue: 26.9,
      categoryId: '1',
    })

    await createProduct.execute({
      active: true,
      description: 'Product description',
      name: 'Product Name',
      sku: 'pnsku1',
      unitaryValue: 28.9,
      categoryId: '1',
    })

    const { products } = await sut.execute()

    expect(products).toHaveLength(2)
    expect(products).toEqual([
      expect.objectContaining({
        sku: 'pnsku',
      }),
      expect.objectContaining({
        sku: 'pnsku1',
      }),
    ])
  })
})
