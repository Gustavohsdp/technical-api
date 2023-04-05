import { prisma } from '@/lib/prisma'
import {
  CreateOrderProps,
  OrdersRepository,
  UpdateOrderProps
} from '../orders-repository'

export class PrismaOrdersRepository implements OrdersRepository {
  async create(data: CreateOrderProps) {
    const products = await prisma.product.findMany({
      where: { id: { in: data.productIds } },
    })

    const order = await prisma.order.create({
      data: {
        customer: { connect: { id: data.customerId } },
        items: {
          create: products.map((product) => {
            return {
              product: { connect: { id: product.id } },
            }
          }),
        },
        totalValue: data.totalValue,
      },
    })

    return order
  }

  async update(id: string, data: UpdateOrderProps) {
    const products = await prisma.product.findMany({
      where: { id: { in: data.productIds } },
    })

    const order = await prisma.order.update({
      where: { id },
      data: {
        customer: { connect: { id: data.customerId } },
        items: {
          update: products.map((product) => ({
            where: {
              orderId: id,
            },
            data: {
              product: { connect: { id: product.id } },
            },
          })),
        },

        totalValue: data.totalValue,
      },
    })

    return order
  }

  async findAll() {
    const orders = await prisma.order.findMany({
      where: {
        canceledAt: null,
      },
      include: {
        items: true,
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

  async findAllOrdersCustomer(customerId: string) {
    const orders = await prisma.order.findMany({
      where: {
        customerId,
      },
      select: {
        id: true,
        customerId: true,
        totalValue: true,
        items: {
          select: {
            product: {
              select: {
                name: true,
                unitaryValue: true,
              },
            },
          },
        },
      },
    })

    return orders
  }
}
