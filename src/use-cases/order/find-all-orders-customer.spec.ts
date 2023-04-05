import { beforeEach, describe, expect, it } from 'vitest'
import { InMemoryOrdersRepository } from './../../repositories/in-memory/in-memory-orders-repository'
import { CreateOrderUseCase } from './create-order-use-case'
import { FindAllOrdersCustomerUseCase } from './find-all-orders-customer-use-case'

let ordersRepository: InMemoryOrdersRepository
let createOrder: CreateOrderUseCase
let sut: FindAllOrdersCustomerUseCase

describe('Find All Order Customer Use Case', () => {
  beforeEach(() => {
    ordersRepository = new InMemoryOrdersRepository()
    createOrder = new CreateOrderUseCase(ordersRepository)
    sut = new FindAllOrdersCustomerUseCase(ordersRepository)
  })

  it('should be able find all order customer', async () => {
    const { order } = await createOrder.execute({
      customerId: '642d605020ef91bcd8b36332',
      productIds: ['642d6355c11f89aba38be1f9'],
      totalValue: '529,90',
    })

    const { orders } = await sut.execute({
      customerId: order.customerId,
    })

    expect(orders).toHaveLength(1)
  })
})
