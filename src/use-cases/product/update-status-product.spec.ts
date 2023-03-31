import { InMemoryProductsRepository } from '@/repositories/in-memory/in-memory-products-repository'
import { beforeEach, describe, expect, it } from 'vitest'
import { CreateProductUseCase } from './create-product-use-case'
import { UpdateStatusProductUseCase } from './update-status-product-use-case'

let productRepository: InMemoryProductsRepository
let createProduct: CreateProductUseCase
let sut: UpdateStatusProductUseCase

describe('Update Category Use Case', () => {
  beforeEach(() => {
    productRepository = new InMemoryProductsRepository()
    createProduct = new CreateProductUseCase(productRepository)
    sut = new UpdateStatusProductUseCase(productRepository)
  })

  it('should not be able to update product with same sku twice ', async () => {
    const { product } = await createProduct.execute({
      active: true,
      description: 'Product description',
      name: 'Product Name',
      sku: 'pnsku',
      unitaryValue: 26.9,
      categoryId: '1',
    })

    const { product: updted } = await sut.execute({
      productId: product.id,
      status: false,
    })

    expect(updted?.active).toEqual(false)
  })
})
