import { Order } from '@prisma/client'
import { randomUUID } from 'node:crypto'
import {
  CreateOrderProps,
  OrderProps,
  OrdersRepository,
  UpdateOrderProps
} from '../orders-repository'

export class InMemoryOrdersRepository implements OrdersRepository {
  public items: Order[] = []

  async create(data: CreateOrderProps) {
    const order = {
      id: randomUUID(),
      customerId: data.customerId,
      productIds: data.productIds.map((productId) => productId),
      totalValue: data.totalValue,
      canceledAt: null,
      createdAt: new Date(),
      updatedAt: new Date(),
    }

    this.items.push(order)

    return order
  }

  async update(id: string, data: UpdateOrderProps) {
    const orderIndex = this.items.findIndex((item) => item.id === id)

    if (orderIndex >= 0) {
      this.items[orderIndex] = {
        id,
        customerId: data.customerId,
        totalValue: data.totalValue,
        canceledAt: null,
        createdAt: this.items[orderIndex].createdAt,
        updatedAt: new Date(),
      }
    }

    const order = this.items.find((item) => item.id === id)

    return order
  }

  async findAll() {
    return this.items
  }

  async findById(id: string) {
    const order = this.items.find((item) => item.id === id)

    if (!order) {
      return null
    }
    return order
  }

  async cancelOrder(id: string) {
    const orderIndex = this.items.findIndex((item) => item.id === id)

    if (orderIndex >= 0) {
      this.items[orderIndex] = {
        id,
        customerId: this.items[orderIndex].customerId,
        totalValue: this.items[orderIndex].totalValue,
        canceledAt: new Date(),
        createdAt: this.items[orderIndex].createdAt,
        updatedAt: new Date(),
      }
    }

    const order = this.items.find((item) => item.id === id)

    return order
  }

  async findAllOrdersCustomer(
    customerId: string,
  ): Promise<OrderProps[] | undefined> {
    throw new Error('Method not implemented.')
  }
}
