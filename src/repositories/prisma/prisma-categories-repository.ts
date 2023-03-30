import { prisma } from '@/lib/prisma'
import { Prisma } from '@prisma/client'
import { CategoriesRepository } from '../categories-repository'

export class PrismaCategoriesRepository implements CategoriesRepository {
  async create(data: Prisma.CategoryCreateInput) {
    const category = await prisma.category.create({
      data: {
        name: data.name,
      },
    })

    return category
  }

  async update(id: string, data: Prisma.CategoryUpdateInput) {
    const category = await prisma.category.update({
      where: {
        id,
      },
      data: {
        name: data.name,
      },
    })

    return category
  }

  async findAll() {
    const categories = await prisma.category.findMany({
      include: {
        products: true,
      },
    })

    return categories
  }

  async findByName(name: string) {
    const category = await prisma.category.findUnique({
      where: {
        name,
      },
    })

    return category
  }
}
