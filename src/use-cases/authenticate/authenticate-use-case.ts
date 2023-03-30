import { AdminsRepository } from '@/repositories/admins-repository'
import { Admin } from '@prisma/client'
import { compare } from 'bcryptjs'
import { InvalidCredentialsError } from '../errors/invalid-credentials-error'

interface AuthenticateUseCaseRequest {
  email: string
  password: string
}

interface AuthenticateUseCaseResponse {
  admin: Admin
}

export class AuthenticateUseCase {
  constructor(private adminsRepository: AdminsRepository) {}

  async execute({
    email,
    password,
  }: AuthenticateUseCaseRequest): Promise<AuthenticateUseCaseResponse> {
    const admin = await this.adminsRepository.findByEmail(email)

    if (!admin) {
      throw new InvalidCredentialsError()
    }

    const doesPasswordMatches = await compare(password, admin.password)

    if (!doesPasswordMatches) {
      throw new InvalidCredentialsError()
    }

    return { admin }
  }
}
