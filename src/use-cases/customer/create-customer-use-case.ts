import { CustomersRepository } from '@/repositories/customers-repository'
import { Customer } from '@prisma/client'
import { CustomerAlreadyExistsError } from '../errors/customer-already-exists-error'

interface CreateCustomerUseCaseRequest {
  name: string
  email: string
  phone: string
  address: string
}

interface CreateCustomerUseCaseResponse {
  customer: Customer
}

export class CreateCustomerUseCase {
  constructor(private customersRepository: CustomersRepository) {}

  async execute({
    email,
    name,
    address,
    phone,
  }: CreateCustomerUseCaseRequest): Promise<CreateCustomerUseCaseResponse> {
    const customerWithSameEmail = await this.customersRepository.findByEmail(
      email,
    )

    if (customerWithSameEmail) {
      throw new CustomerAlreadyExistsError()
    }

    const customer = await this.customersRepository.create({
      email,
      name,
      address,
      phone,
    })

    return { customer }
  }
}
