import { hash } from 'bcryptjs'
import { AdminAlreadyExistsError } from '../errors/admin-already-exists-error'
import { AdminsRepository } from './../../repositories/admins-repository'

interface UpdateAdminUseCaseRequest {
  adminId: string

  name?: string
  email?: string
  password?: string
}

interface UpdateAdminUseCaseResponse {
  admin:
    | {
        id: string
        name: string
        email: string
        createdAt: Date
        updatedAt: Date
      }
    | undefined
}

export class UpdateAdminUseCase {
  constructor(private adminsRepository: AdminsRepository) {}

  async execute({
    email,
    name,
    password,
    adminId,
  }: UpdateAdminUseCaseRequest): Promise<UpdateAdminUseCaseResponse> {
    let passwordHash = null

    if (password) {
      passwordHash = await hash(password, 6)
    }

    let adminWithSameEmail = null

    if (email) {
      adminWithSameEmail = await this.adminsRepository.findByEmail(email)
    }

    if (adminWithSameEmail) {
      throw new AdminAlreadyExistsError()
    }

    const admin = await this.adminsRepository.update(adminId, {
      email,
      name,
      password: passwordHash ?? undefined,
    })

    return { admin }
  }
}
