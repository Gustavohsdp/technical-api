import { Admin } from '@prisma/client'
import { randomUUID } from 'crypto'
import { AdminsRepository } from '../admins-repository'

export class InMemoryAdminsRepository implements AdminsRepository {
  public items: Admin[] = []

  async create(admin: Admin) {
    const administration = {
      id: randomUUID(),
      name: admin.name,
      email: admin.email,
      password: admin.password,
      createdAt: new Date(),
      updatedAt: new Date(),
    }

    this.items.push(administration)

    return administration
  }

  async update(id: string, admin: Admin) {
    const administrationIndex = this.items.findIndex((item) => item.id === id)

    if (administrationIndex >= 0) {
      this.items[administrationIndex] = {
        id,
        name: admin.name,
        email: admin.email,
        password: admin.password,
        createdAt: this.items[administrationIndex].createdAt,
        updatedAt: new Date(),
      }
    }

    const administration = this.items.find((item) => item.id === id)

    return administration
  }

  async findByEmail(email: string) {
    const administration = this.items.find((item) => item.email === email)

    if (!administration) {
      return null
    }
    return administration
  }
}
