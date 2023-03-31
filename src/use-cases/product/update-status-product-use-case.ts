import { ProductsRepository } from '@/repositories/products-repository'
import { Product } from '@prisma/client'

interface UpdateStatusProductUseCaseRequest {
  productId: string

  status: boolean
}

interface UpdateStatusProductUseCaseResponse {
  product: Product | undefined
}

export class UpdateStatusProductUseCase {
  constructor(private productsRepository: ProductsRepository) {}

  async execute({
    productId,
    status,
  }: UpdateStatusProductUseCaseRequest): Promise<UpdateStatusProductUseCaseResponse> {
    const product = await this.productsRepository.upateStatus(productId, status)

    return { product }
  }
}
