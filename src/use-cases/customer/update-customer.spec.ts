import { InMemoryCustomersRepository } from '@/repositories/in-memory/in-memory-customers-repository'
import { beforeEach, describe, expect, it } from 'vitest'
import { CustomerAlreadyExistsError } from '../errors/customer-already-exists-error'
import { CreateCustomerUseCase } from './create-customer-use-case'
import { UpdateCustomerUseCase } from './update-customer-use-case'

let customerRepository: InMemoryCustomersRepository
let createCustomer: CreateCustomerUseCase
let sut: UpdateCustomerUseCase

describe('Update Customer Use Case', () => {
  beforeEach(() => {
    customerRepository = new InMemoryCustomersRepository()
    createCustomer = new CreateCustomerUseCase(customerRepository)
    sut = new UpdateCustomerUseCase(customerRepository)
  })

  it('should not be able to update customer with same email twice ', async () => {
    const email = 'jhondoe@email.com'

    await createCustomer.execute({
      email,
      name: 'Jhon Doe',
      address: '123 Main Street',
      phone: '31999999999',
    })

    const { customer } = await createCustomer.execute({
      email: 'jhondoe@example.com',
      name: 'Jhon Doe',
      address: '123 Main Street',
      phone: '31999999999',
    })

    await expect(() =>
      sut.execute({
        customerId: customer.id,
        email,
        name: customer.name,
        address: customer.address,
        phone: customer.phone,
      }),
    ).rejects.toBeInstanceOf(CustomerAlreadyExistsError)
  })

  it('should be able update customer', async () => {
    const { customer: customerCreated } = await createCustomer.execute({
      email: 'jhondoe@example.com',
      name: 'Jhon Doe',
      address: '123 Main Street',
      phone: '31999999999',
    })

    const { customer } = await sut.execute({
      customerId: customerCreated.id,
      email: 'jhondoe@email.com',
      name: customerCreated.name,
      address: customerCreated.address,
      phone: customerCreated.phone,
    })

    expect(customer?.email).toEqual('jhondoe@email.com')
  })
})
