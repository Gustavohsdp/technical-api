import { ProductsRepository } from '@/repositories/products-repository'
import { Product } from '@prisma/client'
import { ProductAlreadyExistsError } from './../errors/product-already-exists-errot'

interface UpdateProductUseCaseRequest {
  productId: string

  name: string
  description: string
  sku: string
  unitaryValue: number
  active: boolean
  categoryId: string
}

interface UpdateProductUseCaseResponse {
  product: Product | undefined
}

export class UpdateProductUseCase {
  constructor(private productsRepository: ProductsRepository) {}

  async execute({
    name,
    active,
    categoryId,
    description,
    productId,
    sku,
    unitaryValue,
  }: UpdateProductUseCaseRequest): Promise<UpdateProductUseCaseResponse> {
    const ProductWithSameSku = await this.productsRepository.findBySku(sku)

    if (ProductWithSameSku) {
      throw new ProductAlreadyExistsError()
    }

    const product = await this.productsRepository.update(productId, {
      name,
      active,
      categoryId,
      description,
      sku,
      unitaryValue,
      productId,
    })

    return { product }
  }
}
