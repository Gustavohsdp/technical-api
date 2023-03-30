import { CustomersRepository } from '@/repositories/customers-repository'
import { Customer } from '@prisma/client'
import { ResourceNotFoundError } from '../errors/resource-not-found-error'

interface FindByEmailCustomerUseCaseRequest {
  email: string
}

interface FindByEmailCustomerUseCaseResponse {
  customer: Customer
}

export class FindByEmailCustomerUseCase {
  constructor(private customersRepository: CustomersRepository) {}

  async execute({
    email,
  }: FindByEmailCustomerUseCaseRequest): Promise<FindByEmailCustomerUseCaseResponse> {
    const customer = await this.customersRepository.findByEmail(email)

    if (!customer) {
      throw new ResourceNotFoundError()
    }

    return { customer }
  }
}
