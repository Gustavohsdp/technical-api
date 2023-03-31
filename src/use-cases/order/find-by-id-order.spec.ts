import { InMemoryOrdersRepository } from '@/repositories/in-memory/in-memory-orders-repository'
import { randomUUID } from 'node:crypto'
import { beforeEach, describe, expect, it } from 'vitest'
import { CreateOrderUseCase } from './create-order-use-case'
import { FindByIdOrderUseCase } from './find-by-id-order-use-case'

let ordersRepository: InMemoryOrdersRepository
let createOrder: CreateOrderUseCase
let sut: FindByIdOrderUseCase

describe('Find By Id Order Use Case', () => {
  beforeEach(() => {
    ordersRepository = new InMemoryOrdersRepository()
    createOrder = new CreateOrderUseCase(ordersRepository)
    sut = new FindByIdOrderUseCase(ordersRepository)
  })

  it('should be able find order by id', async () => {
    const { order: orderCreated } = await createOrder.execute({
      customerId: randomUUID(),
      productId: randomUUID(),
    })

    const { order } = await sut.execute({
      orderId: orderCreated.id,
    })

    expect(order?.id).toEqual(orderCreated.id)
  })
})
