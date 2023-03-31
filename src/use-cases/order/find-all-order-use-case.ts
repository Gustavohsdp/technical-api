import { OrdersRepository } from '@/repositories/orders-repository'

import { Order } from '@prisma/client'

interface FindAllOrderUseCaseResponse {
  orders: Order[]
}

export class FindAllOrderUseCase {
  constructor(private ordersRepository: OrdersRepository) {}

  async execute(): Promise<FindAllOrderUseCaseResponse> {
    const orders = await this.ordersRepository.findAll()

    return { orders }
  }
}
