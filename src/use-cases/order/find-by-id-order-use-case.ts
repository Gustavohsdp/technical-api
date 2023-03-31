import { OrdersRepository } from '@/repositories/orders-repository'
import { Order } from '@prisma/client'
import { ResourceNotFoundError } from '../errors/resource-not-found-error'

interface FindByIdOrderUseCaseRequest {
  orderId: string
}

interface FindByIdOrderUseCaseResponse {
  order: Order
}

export class FindByIdOrderUseCase {
  constructor(private ordersRepository: OrdersRepository) {}

  async execute({
    orderId,
  }: FindByIdOrderUseCaseRequest): Promise<FindByIdOrderUseCaseResponse> {
    const order = await this.ordersRepository.findById(orderId)

    if (!order) {
      throw new ResourceNotFoundError()
    }

    return { order }
  }
}
