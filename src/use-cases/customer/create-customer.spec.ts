import { InMemoryCustomersRepository } from '@/repositories/in-memory/in-memory-customers-repository'
import { beforeEach, describe, expect, it } from 'vitest'
import { CustomerAlreadyExistsError } from '../errors/customer-already-exists-error'
import { CreateCustomerUseCase } from './create-customer-use-case'

let customerRepository: InMemoryCustomersRepository
let sut: CreateCustomerUseCase

describe('Create Customer Use Case', () => {
  beforeEach(() => {
    customerRepository = new InMemoryCustomersRepository()
    sut = new CreateCustomerUseCase(customerRepository)
  })

  it('should be able to create customer', async () => {
    const { customer } = await sut.execute({
      email: 'jhondoe@email.com',
      name: 'Jhon Doe',
      address: '123 Main Street',
      phone: '31999999999',
    })

    expect(customer.id).toEqual(expect.any(String))
  })

  it('should not be able to create customer with same email twice ', async () => {
    const email = 'jhondoe@email.com'

    await sut.execute({
      email,
      name: 'Jhon Doe',
      address: '123 Main Street',
      phone: '31999999999',
    })

    await expect(() =>
      sut.execute({
        email,
        name: 'Jhon Doe',
        address: '123 Main Street',
        phone: '31999999999',
      }),
    ).rejects.toBeInstanceOf(CustomerAlreadyExistsError)
  })
})
