import { Order } from '@prisma/client'
import { OrdersRepository } from './../../repositories/orders-repository'

interface CreateOrderUseCaseRequest {
  customerId: string
  productIds: string[]
  totalValue: string
  canceledAt?: Date
}

interface CreateOrderUseCaseResponse {
  order: Order
}

export class CreateOrderUseCase {
  constructor(private ordersRepository: OrdersRepository) {}

  async execute({
    customerId,
    productIds,
    canceledAt,
    totalValue,
  }: CreateOrderUseCaseRequest): Promise<CreateOrderUseCaseResponse> {
    const order = await this.ordersRepository.create({
      customerId,
      productIds,
      totalValue,
      canceledAt,
    })
    return { order }
  }
}
