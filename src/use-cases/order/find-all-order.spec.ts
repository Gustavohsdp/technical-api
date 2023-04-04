import { beforeEach, describe, expect, it } from 'vitest'
import { InMemoryOrdersRepository } from './../../repositories/in-memory/in-memory-orders-repository'
import { CreateOrderUseCase } from './create-order-use-case'
import { FindAllOrderUseCase } from './find-all-order-use-case'

let ordersRepository: InMemoryOrdersRepository
let createOrder: CreateOrderUseCase
let sut: FindAllOrderUseCase

describe('Find All Orders Use Case', () => {
  beforeEach(() => {
    ordersRepository = new InMemoryOrdersRepository()
    createOrder = new CreateOrderUseCase(ordersRepository)
    sut = new FindAllOrderUseCase(ordersRepository)
  })

  it('should be able find all orders', async () => {
    await createOrder.execute({
      customerId: 'd278a7ec-5875-438a-8c2c-507c9594ee07',
      totalValue: '100.20',
      productIds: ['d278a7ec-5875-438a-8c2c-507c9594ee08'],
    })

    await createOrder.execute({
      customerId: 'd278a7ec-5875-438a-8c2c-507c9594ee09',
      totalValue: '100.20',
      productIds: ['d278a7ec-5875-438a-8c2c-507c9594ee10'],
    })

    const { orders } = await sut.execute()

    expect(orders).toHaveLength(2)
    expect(orders).toEqual([
      expect.objectContaining({
        customerId: 'd278a7ec-5875-438a-8c2c-507c9594ee07',
      }),
      expect.objectContaining({
        customerId: 'd278a7ec-5875-438a-8c2c-507c9594ee09',
      }),
    ])
  })
})
