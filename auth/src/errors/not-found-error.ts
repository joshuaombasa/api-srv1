import { CustomError } from './custom-error';

class NotFoundError extends CustomError {
  statusCode = 400;
  reason = 'unknown endpoint';
  constructor() {
    super('unknown endpoint');

    Object.setPrototypeOf(this, NotFoundError.prototype);
  }

  serializeErrors() {
    return [{ message: this.reason }];
  }
}

export { NotFoundError };
