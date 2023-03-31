import { randomUUID } from 'node:crypto'
import { beforeEach, describe, expect, it } from 'vitest'
import { InMemoryOrdersRepository } from './../../repositories/in-memory/in-memory-orders-repository'
import { CancelOrderUseCase } from './cancel-order-use-case'
import { CreateOrderUseCase } from './create-order-use-case'

let ordersRepository: InMemoryOrdersRepository
let createOrder: CreateOrderUseCase
let sut: CancelOrderUseCase

describe('Cancel Order Use Case', () => {
  beforeEach(() => {
    ordersRepository = new InMemoryOrdersRepository()
    createOrder = new CreateOrderUseCase(ordersRepository)
    sut = new CancelOrderUseCase(ordersRepository)
  })

  it('should be able to cancel order', async () => {
    const { order: createdOrder } = await createOrder.execute({
      customerId: randomUUID(),
      productId: randomUUID(),
    })

    const { order } = await sut.execute({
      orderId: createdOrder.id,
    })

    expect(order?.canceledAt).toBeDefined()
  })
})
