import { GraphQLError } from 'graphql/error';

export class AuthenticationError extends GraphQLError {
    constructor(message = 'User is not authenticated.') {
        super(message, {
            extensions: {
                code: 'UNAUTHORIZED',
                http: { status: 401 },
            },
        });
    }
}

export class AuthorizationError extends GraphQLError {
    constructor(message = 'User is not authorized.') {
        super(message, {
            extensions: {
                code: 'UNAUTHORIZED',
                http: { status: 401 },
            },
        });
    }
}

export class InternalServerError extends GraphQLError {
    constructor(message = 'Internal server error.') {
        super(message, {
            extensions: {
                code: 'INTERNAL_SERVER_ERROR',
                http: { status: 500 },
            },
        });
    }
}

export class IncorrectInputError extends GraphQLError {
    constructor(message: string) {
        super(message, {
            extensions: {
                code: 'BAD_USER_INPUT',
                http: { status: 400 },
            },
        });
    }
}

export class ConflictError extends GraphQLError {
    constructor(message: string) {
        super(message, {
            extensions: {
                code: 'Conflict',
                http: { status: 409 },
            },
        });
    }
}

export class NonNullableFieldError extends GraphQLError {
    constructor(field = '') {
        super(`Field ${field} can not be null.`, {
            extensions: {
                code: 'BAD_USER_INPUT',
                http: { status: 400 },
            },
        });
    }
}

export class NotFoundError extends GraphQLError {
    constructor(message = 'Not found.') {
        super(message, {
            extensions: {
                code: 'NOT_FOUND',
                http: { status: 404 },
            },
        });
    }
}
