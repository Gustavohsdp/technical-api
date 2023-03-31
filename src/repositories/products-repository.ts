import { Product } from '@prisma/client'

export interface CreateProductProps {
  name: string
  description: string
  sku: string
  unitaryValue: number
  active: boolean

  categoryId: string
}

export interface UpdateProductProps {
  productId: string

  name: string
  description: string
  sku: string
  unitaryValue: number
  active: boolean
  categoryId: string
}

export interface ProductsRepository {
  create(data: CreateProductProps): Promise<Product>
  update(id: string, data: UpdateProductProps): Promise<Product | undefined>
  findAll(): Promise<Product[]>
  upateStatus(id: string, status: boolean): Promise<Product | undefined>
  findBySku(sku: string): Promise<Product | null>
}
