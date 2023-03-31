import { beforeEach, describe, expect, it } from 'vitest'
import { ProductAlreadyExistsError } from '../errors/product-already-exists-errot'
import { InMemoryProductsRepository } from './../../repositories/in-memory/in-memory-products-repository'
import { CreateProductUseCase } from './create-product-use-case'

let productRepository: InMemoryProductsRepository
let sut: CreateProductUseCase

describe('Create Product Use Case', () => {
  beforeEach(() => {
    productRepository = new InMemoryProductsRepository()
    sut = new CreateProductUseCase(productRepository)
  })

  it('should be able to create product', async () => {
    const { product } = await sut.execute({
      active: true,
      description: 'Product description',
      name: 'Product Name',
      sku: 'pnsku',
      unitaryValue: 26.9,
      categoryId: '1',
    })

    expect(product.id).toEqual(expect.any(String))
  })

  it('should not be able to create product with same sku twice ', async () => {
    const sku = 'pnsku'

    await sut.execute({
      active: true,
      description: 'Product description',
      name: 'Product Name',
      sku,
      unitaryValue: 26.9,
      categoryId: '1',
    })

    await expect(() =>
      sut.execute({
        active: true,
        description: 'Product description',
        name: 'Product Name',
        sku,
        unitaryValue: 26.9,
        categoryId: '1',
      }),
    ).rejects.toBeInstanceOf(ProductAlreadyExistsError)
  })
})
