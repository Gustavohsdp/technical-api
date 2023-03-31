import { OrdersRepository } from '@/repositories/orders-repository'
import { Order } from '@prisma/client'

interface CancelOrderUseCaseRequest {
  orderId: string
}

interface UpdateStatusProductUseCaseResponse {
  order: Order | undefined
}

export class CancelOrderUseCase {
  constructor(private ordersRepository: OrdersRepository) {}

  async execute({
    orderId,
  }: CancelOrderUseCaseRequest): Promise<UpdateStatusProductUseCaseResponse> {
    const order = await this.ordersRepository.cancelOrder(orderId)

    return { order }
  }
}
