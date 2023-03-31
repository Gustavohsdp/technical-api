import { prisma } from '@/lib/prisma'
import {
  CreateOrderProps,
  OrdersRepository,
  UpdateOrderProps
} from '../orders-repository'

export class PrismaOrdersRepository implements OrdersRepository {
  async create(data: CreateOrderProps) {
    const order = await prisma.order.create({
      data: {
        customer: { connect: { id: data.customerId } },
        product: { connect: { id: data.productId } },
      },
    })

    return order
  }

  async update(id: string, data: UpdateOrderProps) {
    const order = await prisma.order.update({
      where: { id },
      data: {
        customer: { connect: { id: data.customerId } },
        product: { connect: { id: data.productId } },
      },
    })

    return order
  }

  async findAll() {
    const orders = await prisma.order.findMany({
      where: {
        canceledAt: null,
      },
    })

    return orders
  }

  async findById(id: string) {
    const order = await prisma.order.findUnique({
      where: {
        id,
      },
    })

    return order
  }

  async cancelOrder(id: string) {
    const order = await prisma.order.update({
      where: {
        id,
      },
      data: {
        canceledAt: new Date(),
      },
    })

    return order
  }
}
