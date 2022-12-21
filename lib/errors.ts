export class ApplicationError extends Error {
  code = 400
  constructor(code, message, ...args) {
    super(...args)
    this.code = code
    this.message = message
  }
}

export class BadRequestError extends ApplicationError {
  constructor(message = "Bad Request", ...args) {
    super(400, message, ...args)
  }
}

export class UnauthorizedError extends ApplicationError {
  constructor(message = "Not Authorized") {
    super(401, message)
  }
}

export class ForbiddenError extends ApplicationError {
  constructor(message = "Forbidden", ...args) {
    super(403, message, args)
  }
}

export class NotFoundError extends ApplicationError {
  constructor(message = "Not Found") {
    super(404, message, arguments)
  }
}

export class MissingFieldError extends BadRequestError {
  constructor(fieldName, ...args) {
    super(`${fieldName} is invalid or missing!`, args)
  }
}

export class InternalError extends ApplicationError {
  constructor(message = "Internal Server Error") {
    super(500, message, arguments)
  }
}

export class ConflictError extends ApplicationError {
  constructor(
    message = "Conflicts were found while processing your request!",
    ...args
  ) {
    super(409, message, ...args)
  }
}

export class MethodNotAllowed extends ApplicationError {
  constructor(message = "Method not allowed", ...args) {
    super(405, message, ...args)
  }
}

export class ValidationError extends ApplicationError {
  constructor(message = "Validation Failed") {
    super(400, message)
  }
}
