import { InMemoryProductsRepository } from '@/repositories/in-memory/in-memory-products-repository'
import { beforeEach, describe, expect, it } from 'vitest'
import { ProductAlreadyExistsError } from '../errors/product-already-exists-errot'
import { CreateProductUseCase } from './create-product-use-case'
import { UpdateProductUseCase } from './update-product-use-case'

let productRepository: InMemoryProductsRepository
let createProduct: CreateProductUseCase
let sut: UpdateProductUseCase

describe('Update Product Use Case', () => {
  beforeEach(() => {
    productRepository = new InMemoryProductsRepository()
    createProduct = new CreateProductUseCase(productRepository)
    sut = new UpdateProductUseCase(productRepository)
  })

  it('should not be able to update product with same sku twice ', async () => {
    const sku = 'pnsku'

    await createProduct.execute({
      active: true,
      description: 'Product description',
      name: 'Product Name',
      sku,
      unitaryValue: 26.9,
      categoryId: '1',
    })

    const { product } = await createProduct.execute({
      active: true,
      description: 'Product description',
      name: 'Product Name',
      sku: 'pnsku1',
      unitaryValue: 28.9,
      categoryId: '1',
    })

    await expect(() =>
      sut.execute({
        productId: product.id,
        active: product.active,
        categoryId: product.categoryId,
        description: product.description,
        name: product.name,
        unitaryValue: product.unitaryValue,
        sku,
      }),
    ).rejects.toBeInstanceOf(ProductAlreadyExistsError)
  })

  it('should be able update product', async () => {
    const { product: categoryProduct } = await createProduct.execute({
      active: true,
      description: 'Product description',
      name: 'Product Name',
      sku: 'pnsku1',
      unitaryValue: 28.9,
      categoryId: '1',
    })

    const { product } = await sut.execute({
      productId: categoryProduct.id,
      active: categoryProduct.active,
      description: categoryProduct.description,
      name: categoryProduct.name,
      sku: 'pnsku',
      unitaryValue: categoryProduct.unitaryValue,
      categoryId: categoryProduct.categoryId,
    })

    expect(product?.sku).toEqual('pnsku')
  })
})
