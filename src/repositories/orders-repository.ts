import { Order } from '@prisma/client'

export interface CreateOrderProps {
  customerId: string
  productIds: string[]
  totalValue: string
  canceledAt?: Date
}

export interface UpdateOrderProps {
  productIds: string[]
  customerId: string
  totalValue: string
  canceledAt?: Date
}

export interface OrdersRepository {
  create(data: CreateOrderProps): Promise<Order>
  update(id: string, data: UpdateOrderProps): Promise<Order | undefined>
  findAll(): Promise<Order[]>
  findById(id: string): Promise<Order | null>
  cancelOrder(id: string): Promise<Order | undefined>
}
