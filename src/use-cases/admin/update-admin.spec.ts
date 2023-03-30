import { InMemoryAdminsRepository } from '@/repositories/in-memory/in-memory-admins-repository'
import { beforeEach, describe, expect, it } from 'vitest'
import { AdminAlreadyExistsError } from '../errors/admin-already-exists-error'
import { CreateAdminUseCase } from './create-admin-use-case'
import { UpdateAdminUseCase } from './update-admin-use-case'

let adminRepository: InMemoryAdminsRepository
let createAdmin: CreateAdminUseCase
let sut: UpdateAdminUseCase

describe('Update admin Use Case', () => {
  beforeEach(() => {
    adminRepository = new InMemoryAdminsRepository()
    createAdmin = new CreateAdminUseCase(adminRepository)
    sut = new UpdateAdminUseCase(adminRepository)
  })

  it('should not be able to update admin with same email twice ', async () => {
    const email = 'jhondoe@email.com'

    await createAdmin.execute({
      email,
      name: 'Jhon Doe',
      password: '654321',
    })

    const { admin } = await createAdmin.execute({
      email: 'jhondoe@example.com',
      name: 'Jhon Doe',
      password: '654321',
    })

    await expect(() =>
      sut.execute({
        adminId: admin.id,
        email,
        name: 'Jhon Doe',
        password: '654321',
      }),
    ).rejects.toBeInstanceOf(AdminAlreadyExistsError)
  })

  it('should be able update people', async () => {
    const { admin: adminCreated } = await createAdmin.execute({
      email: 'jhondoe@example.com',
      name: 'Jhon Doe',
      password: '654321',
    })

    const { admin } = await sut.execute({
      adminId: adminCreated.id,
      email: 'jhondoe@email.com',
      name: 'Jhon Doe',
      password: '654321',
    })

    expect(admin?.email).toEqual('jhondoe@email.com')
  })
})
