import { Order } from '@prisma/client'
import { OrdersRepository } from './../../repositories/orders-repository'

interface CreateOrderUseCaseRequest {
  customerId: string
  productId: string
  canceledAt?: Date
}

interface CreateOrderUseCaseResponse {
  order: Order
}

export class CreateOrderUseCase {
  constructor(private ordersRepository: OrdersRepository) {}

  async execute({
    customerId,
    productId,
    canceledAt,
  }: CreateOrderUseCaseRequest): Promise<CreateOrderUseCaseResponse> {
    const order = await this.ordersRepository.create({
      customerId,
      productId,
      canceledAt,
    })
    return { order }
  }
}
