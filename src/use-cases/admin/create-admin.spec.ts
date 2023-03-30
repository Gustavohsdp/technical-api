import { InMemoryAdminsRepository } from '@/repositories/in-memory/in-memory-admins-repository'
import { compare } from 'bcryptjs'
import { beforeEach, describe, expect, it } from 'vitest'
import { AdminAlreadyExistsError } from '../errors/admin-already-exists-error'
import { CreateAdminUseCase } from './create-admin-use-case'

let adminRepository: InMemoryAdminsRepository
let sut: CreateAdminUseCase

describe('Create Admin Use Case', () => {
  beforeEach(() => {
    adminRepository = new InMemoryAdminsRepository()
    sut = new CreateAdminUseCase(adminRepository)
  })

  it('should be able to create admin', async () => {
    const { admin } = await sut.execute({
      email: 'jhondoe@email.com',
      name: 'Jhon Doe',
      password: '654321',
    })

    expect(admin.id).toEqual(expect.any(String))
  })

  it('should hash admin password upon registration', async () => {
    const { admin } = await sut.execute({
      email: 'jhondoe@email.com',
      name: 'Jhon Doe',
      password: '654321',
    })

    const isPasswordCorrectlyHashed = await compare('654321', admin.password)

    expect(isPasswordCorrectlyHashed).toBe(true)
  })

  it('should not be able to create admin with same email twice ', async () => {
    const email = 'jhondoe@email.com'

    await sut.execute({
      email,
      name: 'Jhon Doe',
      password: '654321',
    })

    await expect(() =>
      sut.execute({
        email,
        name: 'Jhon Doe',
        password: '654321',
      }),
    ).rejects.toBeInstanceOf(AdminAlreadyExistsError)
  })
})
