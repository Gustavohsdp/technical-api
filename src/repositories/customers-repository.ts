import { Customer, Prisma } from '@prisma/client'

export interface CustomersRepository {
  create(customer: Prisma.CustomerCreateInput): Promise<Customer>
  update(
    id: string,
    customer: Prisma.CustomerUpdateInput,
  ): Promise<Customer | undefined>
  findByEmail(email: string): Promise<Customer | null>
}
