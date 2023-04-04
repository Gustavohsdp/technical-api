import { OrdersRepository } from '@/repositories/orders-repository'
import { Order } from '@prisma/client'

interface UpdateOrderUseCaseRequest {
  orderId: string

  customerId: string
  productIds: string[]
  totalValue: string
  canceledAt?: Date
}

interface UpdateOrderUseCaseResponse {
  order: Order | undefined
}

export class UpdateOrderUseCase {
  constructor(private ordersRepository: OrdersRepository) {}

  async execute({
    customerId,
    orderId,
    productIds,
    canceledAt,
    totalValue,
  }: UpdateOrderUseCaseRequest): Promise<UpdateOrderUseCaseResponse> {
    const order = await this.ordersRepository.update(orderId, {
      customerId,
      productIds,
      canceledAt,
      totalValue,
    })

    return { order }
  }
}
