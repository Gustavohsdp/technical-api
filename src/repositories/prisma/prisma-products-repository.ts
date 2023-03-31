import { prisma } from '@/lib/prisma'
import {
  CreateProductProps,
  ProductsRepository,
  UpdateProductProps
} from '../products-repository'

export class PrismaProductsRepository implements ProductsRepository {
  async create(data: CreateProductProps) {
    const product = await prisma.product.create({
      data: {
        active: data.active,
        description: data.description,
        name: data.name,
        sku: data.sku,
        unitaryValue: data.unitaryValue,
        category: { connect: { id: data.categoryId } },
      },
      include: {
        orders: true,
      },
    })

    return product
  }

  async update(id: string, data: UpdateProductProps) {
    const product = await prisma.product.update({
      where: { id },
      data: {
        active: data.active,
        description: data.description,
        name: data.name,
        sku: data.sku,
        unitaryValue: data.unitaryValue,
        category: { connect: { id: data.categoryId } },
      },
      include: {
        orders: true,
      },
    })

    return product
  }

  async findAll() {
    const products = await prisma.product.findMany({
      where: {
        active: true,
      },
      include: {
        orders: true,
      },
      orderBy: { id: 'asc' },
    })

    return products
  }

  async upateStatus(id: string, status: boolean) {
    const product = await prisma.product.update({
      where: { id },
      data: {
        active: status,
      },
      include: {
        orders: true,
      },
    })

    return product
  }

  async findBySku(sku: string) {
    const product = await prisma.product.findUnique({
      where: { sku },
      include: {
        orders: true,
      },
    })

    return product
  }
}
