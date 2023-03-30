import { Admin } from '@prisma/client'
import { hash } from 'bcryptjs'
import { AdminAlreadyExistsError } from '../errors/admin-already-exists-error'
import { AdminsRepository } from './../../repositories/admins-repository'

interface UpdateAdminUseCaseRequest {
  adminId: string

  name: string
  email: string
  password: string
}

interface UpdateAdminUseCaseResponse {
  admin: Admin | undefined
}

export class UpdateAdminUseCase {
  constructor(private adminsRepository: AdminsRepository) {}

  async execute({
    email,
    name,
    password,
    adminId,
  }: UpdateAdminUseCaseRequest): Promise<UpdateAdminUseCaseResponse> {
    const passwordHash = await hash(password, 6)

    const adminWithSameEmail = await this.adminsRepository.findByEmail(email)

    if (adminWithSameEmail) {
      throw new AdminAlreadyExistsError()
    }

    const admin = await this.adminsRepository.update(adminId, {
      email,
      name,
      password: passwordHash,
    })

    return { admin }
  }
}
