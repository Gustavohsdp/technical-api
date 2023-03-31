import { InMemoryOrdersRepository } from '@/repositories/in-memory/in-memory-orders-repository'
import { beforeEach, describe, expect, it } from 'vitest'
import { CreateOrderUseCase } from './create-order-use-case'
import { UpdateOrderUseCase } from './update-order-use-case'

let ordersRepository: InMemoryOrdersRepository
let createOrder: CreateOrderUseCase
let sut: UpdateOrderUseCase

describe('Update Order Use Case', () => {
  beforeEach(() => {
    ordersRepository = new InMemoryOrdersRepository()
    createOrder = new CreateOrderUseCase(ordersRepository)
    sut = new UpdateOrderUseCase(ordersRepository)
  })

  it('should be able update order', async () => {
    const { order: orderCreated } = await createOrder.execute({
      customerId: 'd278a7ec-5875-438a-8c2c-507c9594ee01',
      productId: 'd278a7ec-5875-438a-8c2c-507c9594ee02',
    })

    const { order } = await sut.execute({
      orderId: orderCreated.id,
      customerId: orderCreated.customerId,
      productId: 'd278a7ec-5875-438a-8c2c-507c9594ee05',
    })

    expect(order?.productId).toEqual('d278a7ec-5875-438a-8c2c-507c9594ee05')
  })
})
