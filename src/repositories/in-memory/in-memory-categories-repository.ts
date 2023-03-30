import { Category, Prisma } from '@prisma/client'
import { randomUUID } from 'node:crypto'
import { CategoriesRepository } from '../categories-repository'

export class InMemoryCategoriesRepository implements CategoriesRepository {
  public items: Category[] = []

  async create(data: Prisma.CategoryCreateInput) {
    const category = {
      id: randomUUID(),
      name: data.name,

      createdAt: new Date(),
      updatedAt: new Date(),
    }

    this.items.push(category)

    return category
  }

  async update(id: string, data: Category) {
    const categoryIndex = this.items.findIndex((item) => item.id === id)

    if (categoryIndex >= 0) {
      this.items[categoryIndex] = {
        id,
        name: data.name,
        createdAt: this.items[categoryIndex].createdAt,
        updatedAt: new Date(),
      }
    }

    const category = this.items.find((item) => item.id === id)

    return category
  }

  async findAll() {
    return this.items
  }

  async findByName(name: string): Promise<Category | null> {
    const category = this.items.find((item) => item.name === name)

    if (!category) {
      return null
    }
    return category
  }
}
