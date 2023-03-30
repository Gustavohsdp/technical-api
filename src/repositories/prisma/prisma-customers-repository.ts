import { prisma } from '@/lib/prisma'
import { Prisma } from '@prisma/client'
import { CustomersRepository } from '../customers-repository'

export class PrismaCustomersRepository implements CustomersRepository {
  async create(data: Prisma.CustomerCreateInput) {
    const customer = await prisma.customer.create({
      data: {
        address: data.address,
        email: data.email,
        name: data.name,
        phone: data.phone,
      },
    })

    return customer
  }

  async update(id: string, data: Prisma.CustomerUpdateInput) {
    const customer = await prisma.customer.update({
      where: {
        id,
      },
      data: {
        address: data.address,
        email: data.email,
        name: data.name,
        phone: data.phone,
      },
    })

    return customer
  }

  async findByEmail(email: string) {
    const customer = await prisma.customer.findUnique({
      where: {
        email,
      },
      include: {
        orders: true,
      },
    })

    return customer
  }
}
