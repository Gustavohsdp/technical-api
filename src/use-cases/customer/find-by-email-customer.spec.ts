import { InMemoryCustomersRepository } from '@/repositories/in-memory/in-memory-customers-repository'
import { beforeEach, describe, expect, it } from 'vitest'
import { ResourceNotFoundError } from '../errors/resource-not-found-error'
import { CreateCustomerUseCase } from './create-customer-use-case'
import { FindByEmailCustomerUseCase } from './find-by-email-customer-use-case'

let customerRepository: InMemoryCustomersRepository
let createCustomer: CreateCustomerUseCase
let sut: FindByEmailCustomerUseCase

describe('Find By Email Customer Use Case', () => {
  beforeEach(() => {
    customerRepository = new InMemoryCustomersRepository()
    createCustomer = new CreateCustomerUseCase(customerRepository)
    sut = new FindByEmailCustomerUseCase(customerRepository)
  })

  it('should not be able to find an customer with invalid email', async () => {
    const email = 'jhondoe@email.com'

    await createCustomer.execute({
      email,
      name: 'Jhon Doe',
      address: '123 Main Street',
      phone: '31999999999',
    })

    await expect(() =>
      sut.execute({
        email: 'jhondoe@example.com',
      }),
    ).rejects.toBeInstanceOf(ResourceNotFoundError)
  })

  it('should be able find admin by email', async () => {
    const email = 'jhondoe@email.com'

    await createCustomer.execute({
      email,
      name: 'Jhon Doe',
      address: '123 Main Street',
      phone: '31999999999',
    })

    const { customer } = await sut.execute({
      email,
    })

    expect(customer?.email).toEqual(email)
  })
})
