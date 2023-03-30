import { Admin, Prisma } from '@prisma/client'

export interface AdminsRepository {
  create(admin: Prisma.AdminCreateInput): Promise<Admin>
  update(id: string, admin: Prisma.AdminUpdateInput): Promise<Admin | undefined>
  findByEmail(email: string): Promise<Admin | null>
}
