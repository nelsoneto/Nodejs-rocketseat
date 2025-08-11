// late check-ins validation error
export class LateCheckInsValidationError extends Error {
  constructor() {
    super('Check-in cannot be validated after 20 minutes of its creation')
  }
}
