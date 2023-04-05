import { CustomersRepository } from '@/repositories/customers-repository'
import { Customer } from '@prisma/client'
import { CustomerAlreadyExistsError } from '../errors/customer-already-exists-error'

interface UpdateCustomerUseCaseRequest {
  customerId: string

  name: string
  email?: string
  phone: string
  address: string
}

interface UpdateCustomerUseCaseResponse {
  customer: Customer | undefined
}

export class UpdateCustomerUseCase {
  constructor(private customersRepository: CustomersRepository) {}

  async execute({
    email,
    name,
    address,
    phone,
    customerId,
  }: UpdateCustomerUseCaseRequest): Promise<UpdateCustomerUseCaseResponse> {
    let customerWithSameEmail = null

    if (email) {
      customerWithSameEmail = await this.customersRepository.findByEmail(email)
    }

    if (customerWithSameEmail) {
      throw new CustomerAlreadyExistsError()
    }

    const customer = await this.customersRepository.update(customerId, {
      email,
      name,
      address,
      phone,
    })

    return { customer }
  }
}
