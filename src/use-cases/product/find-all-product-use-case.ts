import { ProductsRepository } from '@/repositories/products-repository'

import { Product } from '@prisma/client'

interface FindAllProductUseCaseResponse {
  products: Product[]
}

export class FindAllProductUseCase {
  constructor(private productsRepository: ProductsRepository) {}

  async execute(): Promise<FindAllProductUseCaseResponse> {
    const products = await this.productsRepository.findAll()

    return { products }
  }
}
