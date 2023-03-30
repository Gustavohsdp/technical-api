import { Admin, Prisma } from '@prisma/client'

export interface AdminUpdateResponse {
  id: string
  name: string
  email: string
  createdAt: Date
  updatedAt: Date
}

export interface AdminsRepository {
  create(admin: Prisma.AdminCreateInput): Promise<Admin>
  update(
    id: string,
    admin: Prisma.AdminUpdateInput,
  ): Promise<AdminUpdateResponse | undefined>
  findByEmail(email: string): Promise<Admin | null>
}
