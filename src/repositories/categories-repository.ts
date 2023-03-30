import { Category, Prisma } from '@prisma/client'

export interface CategoriesRepository {
  create(data: Prisma.CategoryCreateInput): Promise<Category>
  update(
    id: string,
    data: Prisma.CategoryUpdateInput,
  ): Promise<Category | undefined>
  findAll(): Promise<Category[]>
  findByName(name: string): Promise<Category | null>
}
