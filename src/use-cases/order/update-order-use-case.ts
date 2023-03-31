import { OrdersRepository } from '@/repositories/orders-repository'
import { Order } from '@prisma/client'

interface UpdateOrderUseCaseRequest {
  orderId: string

  customerId: string
  productId: string
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
    productId,
    canceledAt,
  }: UpdateOrderUseCaseRequest): Promise<UpdateOrderUseCaseResponse> {
    const order = await this.ordersRepository.update(orderId, {
      customerId,
      productId,
      canceledAt,
    })

    return { order }
  }
}
