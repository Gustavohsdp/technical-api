import { prisma } from '@/lib/prisma'
import { Admin } from '@prisma/client'
import { AdminsRepository } from '../admins-repository'

export class PrismaAdminsRepository implements AdminsRepository {
  async create(admin: Admin) {
    const administration = await prisma.admin.create({
      data: {
        ...admin,
      },
    })

    return administration
  }

  async update(id: string, admin: Admin) {
    const administration = await prisma.admin.update({
      where: {
        id,
      },
      data: {
        ...admin,
      },
      select: {
        email: true,
        name: true,
        id: true,
        createdAt: true,
        updatedAt: true,
      },
    })

    return administration
  }

  async findByEmail(email: string) {
    const administration = await prisma.admin.findUnique({
      where: {
        email,
      },
    })

    return administration
  }
}
