import { Admin } from '@prisma/client'
import { ResourceNotFoundError } from '../errors/resource-not-found-error'
import { AdminsRepository } from './../../repositories/admins-repository'

interface FindByEmailAdminUseCaseRequest {
  email: string
}

interface FindByEmailAdminUseCaseResponse {
  admin: Admin
}

export class FindByEmailAdminUseCase {
  constructor(private adminsRepository: AdminsRepository) {}

  async execute({
    email,
  }: FindByEmailAdminUseCaseRequest): Promise<FindByEmailAdminUseCaseResponse> {
    const admin = await this.adminsRepository.findByEmail(email)

    if (!admin) {
      throw new ResourceNotFoundError()
    }

    return { admin }
  }
}
