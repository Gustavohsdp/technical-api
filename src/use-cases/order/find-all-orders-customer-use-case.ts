import { OrderProps, OrdersRepository } from '@/repositories/orders-repository'

interface FindAllOrdersCustomerUseCaseRequest {
  customerId: string
}

interface FindAllOrdersCustomerUseCaseResponse {
  orders: OrderProps[]
}

export class FindAllOrdersCustomerUseCase {
  constructor(private ordersRepository: OrdersRepository) {}

  async execute({
    customerId,
  }: FindAllOrdersCustomerUseCaseRequest): Promise<FindAllOrdersCustomerUseCaseResponse> {
    const orders = await this.ordersRepository.findAllOrdersCustomer(customerId)

    return { orders }
  }
}
