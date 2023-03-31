import { Product } from '@prisma/client'
import { randomUUID } from 'node:crypto'
import {
  CreateProductProps,
  ProductsRepository,
  UpdateProductProps
} from '../products-repository'

export class InMemoryProductsRepository implements ProductsRepository {
  public items: Product[] = []

  async create(data: CreateProductProps) {
    const product = {
      id: randomUUID(),
      name: data.name,
      description: data.description,
      sku: data.sku,
      unitaryValue: data.unitaryValue,
      categoryId: data.categoryId,
      active: data.active,
      createdAt: new Date(),
      updatedAt: new Date(),
    }

    this.items.push(product)

    return product
  }

  async update(id: string, data: UpdateProductProps) {
    const productIndex = this.items.findIndex((item) => item.id === id)

    if (productIndex >= 0) {
      this.items[productIndex] = {
        id,
        name: data.name,
        description: data.description,
        sku: data.sku,
        unitaryValue: data.unitaryValue,
        categoryId: data.categoryId,
        active: data.active,
        createdAt: this.items[productIndex].createdAt,
        updatedAt: new Date(),
      }
    }

    const product = this.items.find((item) => item.id === id)

    return product
  }

  async findAll() {
    return this.items
  }

  async upateStatus(id: string, status: boolean) {
    const productIndex = this.items.findIndex((item) => item.id === id)

    if (productIndex >= 0) {
      this.items[productIndex] = {
        id,
        name: this.items[productIndex].name,
        description: this.items[productIndex].description,
        sku: this.items[productIndex].sku,
        unitaryValue: this.items[productIndex].unitaryValue,
        categoryId: this.items[productIndex].categoryId,
        active: status,
        createdAt: this.items[productIndex].createdAt,
        updatedAt: new Date(),
      }
    }

    const product = this.items.find((item) => item.id === id)

    return product
  }

  async findBySku(sku: string) {
    const product = this.items.find((item) => item.sku === sku)

    if (!product) {
      return null
    }
    return product
  }
}
