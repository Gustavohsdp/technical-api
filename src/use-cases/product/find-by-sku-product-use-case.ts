import { ProductsRepository } from '@/repositories/products-repository'
import { Product } from '@prisma/client'
import { ResourceNotFoundError } from '../errors/resource-not-found-error'

interface FindBySkuProductUseCaseRequest {
  sku: string
}

interface FindBySkuProductUseCaseResponse {
  product: Product
}

export class FindBySkuProductUseCase {
  constructor(private productsRepository: ProductsRepository) {}

  async execute({
    sku,
  }: FindBySkuProductUseCaseRequest): Promise<FindBySkuProductUseCaseResponse> {
    const product = await this.productsRepository.findBySku(sku)

    if (!product) {
      throw new ResourceNotFoundError()
    }

    return { product }
  }
}
