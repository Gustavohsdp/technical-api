export class AdminAlreadyExistsError extends Error {
  constructor() {
    super('E-mail already exists.')
  }
}
