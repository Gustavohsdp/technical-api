import { InMemoryAdminsRepository } from '@/repositories/in-memory/in-memory-admins-repository'
import { beforeEach, describe, expect, it } from 'vitest'
import { ResourceNotFoundError } from '../errors/resource-not-found-error'
import { CreateAdminUseCase } from './create-admin-use-case'
import { FindByEmailAdminUseCase } from './find-by-email-admin-use-case'

let adminRepository: InMemoryAdminsRepository
let createAdmin: CreateAdminUseCase
let sut: FindByEmailAdminUseCase

describe('Find By Email Admin Use Case', () => {
  beforeEach(() => {
    adminRepository = new InMemoryAdminsRepository()
    createAdmin = new CreateAdminUseCase(adminRepository)
    sut = new FindByEmailAdminUseCase(adminRepository)
  })

  it('should not be able to find an admin with invalid email', async () => {
    const email = 'jhondoe@email.com'

    await createAdmin.execute({
      email,
      name: 'Jhon Doe',
      password: '654321',
    })

    await expect(() =>
      sut.execute({
        email: 'jhondoe@example.com',
      }),
    ).rejects.toBeInstanceOf(ResourceNotFoundError)
  })

  it('should be able find admin by email', async () => {
    const email = 'jhondoe@email.com'

    await createAdmin.execute({
      email,
      name: 'Jhon Doe',
      password: '654321',
    })

    const { admin } = await sut.execute({
      email,
    })

    expect(admin?.email).toEqual(email)
  })
})
