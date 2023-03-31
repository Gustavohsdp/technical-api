import { InMemoryProductsRepository } from '@/repositories/in-memory/in-memory-products-repository'
import { beforeEach, describe, expect, it } from 'vitest'
import { ResourceNotFoundError } from '../errors/resource-not-found-error'
import { CreateProductUseCase } from './create-product-use-case'
import { FindBySkuProductUseCase } from './find-by-sku-product-use-case'

let productRepository: InMemoryProductsRepository
let createProduct: CreateProductUseCase
let sut: FindBySkuProductUseCase

describe('Find By Name Category Use Case', () => {
  beforeEach(() => {
    productRepository = new InMemoryProductsRepository()
    createProduct = new CreateProductUseCase(productRepository)
    sut = new FindBySkuProductUseCase(productRepository)
  })

  it('should not be able to find an product with invalid sku', async () => {
    await createProduct.execute({
      active: true,
      description: 'Product description',
      name: 'Product Name',
      sku: 'pnsku',
      unitaryValue: 26.9,
      categoryId: '1',
    })

    await expect(() =>
      sut.execute({
        sku: 'pnsku1',
      }),
    ).rejects.toBeInstanceOf(ResourceNotFoundError)
  })

  it('should be able find product by sku', async () => {
    const sku = 'pnsku'

    await createProduct.execute({
      active: true,
      description: 'Product description',
      name: 'Product Name',
      sku,
      unitaryValue: 26.9,
      categoryId: '1',
    })

    const { product } = await sut.execute({
      sku,
    })

    expect(product?.sku).toEqual(sku)
  })
})
