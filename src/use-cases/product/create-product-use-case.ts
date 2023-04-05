import { ProductsRepository } from '@/repositories/products-repository'
import { Product } from '@prisma/client'
import { ProductAlreadyExistsError } from './../errors/product-already-exists-errot'

interface CreateProductUseCaseRequest {
  name: string
  description: string
  sku: string
  unitaryValue: string
  active: boolean
  imageUrl?: string

  categoryId: string
}

interface CreateProductUseCaseResponse {
  product: Product
}

export class CreateProductUseCase {
  constructor(private productsRepository: ProductsRepository) {}

  async execute({
    active,
    categoryId,
    description,
    name,
    sku,
    unitaryValue,
    imageUrl,
  }: CreateProductUseCaseRequest): Promise<CreateProductUseCaseResponse> {
    const productWithSameSku = await this.productsRepository.findBySku(sku)

    if (productWithSameSku) {
      throw new ProductAlreadyExistsError()
    }

    const product = await this.productsRepository.create({
      active,
      categoryId,
      description,
      name,
      sku,
      unitaryValue,
      imageUrl,
    })
    return { product }
  }
}
