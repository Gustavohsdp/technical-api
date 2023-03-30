import { InMemoryAdminsRepository } from '@/repositories/in-memory/in-memory-admins-repository'
import { beforeEach, describe, expect, it } from 'vitest'
import { CreateAdminUseCase } from '../admin/create-admin-use-case'
import { InvalidCredentialsError } from '../errors/invalid-credentials-error'
import { AuthenticateUseCase } from './authenticate-use-case'

let adminRepository: InMemoryAdminsRepository
let createAdmin: CreateAdminUseCase
let sut: AuthenticateUseCase

describe('Authenticate Use Case', () => {
  beforeEach(() => {
    adminRepository = new InMemoryAdminsRepository()
    createAdmin = new CreateAdminUseCase(adminRepository)
    sut = new AuthenticateUseCase(adminRepository)
  })

  it('should be able to authenticate', async () => {
    await createAdmin.execute({
      name: 'John Doe',
      email: 'jhondoe@email.com',
      password: '654321',
    })

    const { admin } = await sut.execute({
      email: 'jhondoe@email.com',
      password: '654321',
    })

    expect(admin.id).toEqual(expect.any(String))
  })

  it('should not be able to authenticate with wrong email', async () => {
    await expect(() =>
      sut.execute({
        email: 'jhondoe@example.com',
        password: '654321',
      }),
    ).rejects.toBeInstanceOf(InvalidCredentialsError)
  })

  it('should not be able to authenticate with wrong password', async () => {
    await createAdmin.execute({
      name: 'John Doe',
      email: 'jhondoe@email.com',
      password: '654321',
    })

    await expect(() =>
      sut.execute({
        email: 'jhondoe@email.com',
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(InvalidCredentialsError)
  })
})
