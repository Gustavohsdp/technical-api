import { randomUUID } from 'node:crypto'
import { beforeEach, describe, expect, it } from 'vitest'
import { InMemoryOrdersRepository } from './../../repositories/in-memory/in-memory-orders-repository'
import { CreateOrderUseCase } from './create-order-use-case'

let ordersRepository: InMemoryOrdersRepository
let sut: CreateOrderUseCase

describe('Create Order Use Case', () => {
  beforeEach(() => {
    ordersRepository = new InMemoryOrdersRepository()
    sut = new CreateOrderUseCase(ordersRepository)
  })

  it('should be able to create order', async () => {
    const { order } = await sut.execute({
      customerId: randomUUID(),
      productIds: [randomUUID()],
      totalValue: '26,90',
    })

    expect(order.id).toEqual(expect.any(String))
  })
})
