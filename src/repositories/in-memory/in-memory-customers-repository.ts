import { Customer, Prisma } from '@prisma/client'
import { randomUUID } from 'crypto'
import { CustomersRepository } from '../customers-repository'

export class InMemoryCustomersRepository implements CustomersRepository {
  public items: Customer[] = []

  async create(data: Prisma.CustomerCreateInput) {
    const customer = {
      id: randomUUID(),
      name: data.name,
      email: data.email,
      phone: data.phone,
      address: data.address,
      createdAt: new Date(),
      updatedAt: new Date(),
    }

    this.items.push(customer)

    return customer
  }

  async update(id: string, data: Customer) {
    const customerIndex = this.items.findIndex((item) => item.id === id)

    if (customerIndex >= 0) {
      this.items[customerIndex] = {
        id,
        name: data.name,
        email: data.email,
        address: data.address,
        phone: data.phone,
        createdAt: this.items[customerIndex].createdAt,
        updatedAt: new Date(),
      }
    }

    const customer = this.items.find((item) => item.id === id)

    return customer
  }

  async findByEmail(email: string) {
    const customer = this.items.find((item) => item.email === email)

    if (!customer) {
      return null
    }
    return customer
  }
}
