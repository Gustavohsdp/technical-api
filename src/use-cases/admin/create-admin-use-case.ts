import { Admin } from '@prisma/client'
import { hash } from 'bcryptjs'
import { AdminAlreadyExistsError } from '../errors/admin-already-exists-error'
import { AdminsRepository } from './../../repositories/admins-repository'

interface CreateAdminUseCaseRequest {
  name: string
  email: string
  password: string
}

interface CreateAdminUseCaseResponse {
  admin: Admin
}

export class CreateAdminUseCase {
  constructor(private adminsRepository: AdminsRepository) {}

  async execute({
    email,
    name,
    password,
  }: CreateAdminUseCaseRequest): Promise<CreateAdminUseCaseResponse> {
    const passwordHash = await hash(password, 6)

    const adminWithSameEmail = await this.adminsRepository.findByEmail(email)

    if (adminWithSameEmail) {
      throw new AdminAlreadyExistsError()
    }

    const admin = await this.adminsRepository.create({
      email,
      name,
      password: passwordHash,
    })

    return { admin }
  }
}
