export function ensureError(value: unknown): BaseError {
  if (value instanceof BaseError) {
    return value;
  }

  if (value instanceof Error) {
    return new BaseError(value.message, { error: value });
  }
  let stringified = "[Unable to stringify the thrown value]";
  try {
    stringified = JSON.stringify(value);
  } catch {}

  const error = new Error(
    `This value was thrown as is, not through an Error: ${stringified}`,
  );
  return new BaseError(error.message, { error: error });
}

type Jsonable =
  | string
  | number
  | boolean
  | null
  | undefined
  | readonly Jsonable[]
  | { readonly [key: string]: Jsonable }
  | { toJSON(): Jsonable };

export class BaseError extends Error {
  public readonly context?: Jsonable;

  constructor(
    message: string,
    options: { error?: Error; context?: Jsonable } = {},
  ) {
    const { error, context } = options;
    super(message, { cause: error });
    this.name = this.constructor.name;
    this.message = message;
    this.context = context;
  }

  toJSON() {
    return {
      name: this.name,
      message: this.message,
      context: this.context,
      cause: this.cause instanceof Error ? this.cause.message : this.cause,
    };
  }
}

export type ResultWithError<T, E extends BaseError = BaseError> =
  | {
      error: null;
      data: T;
    }
  | {
      error: E;
      data: null;
    };

export const createResponse = <T>(
  data: T,
  error: BaseError | unknown | null,
): ResultWithError<T> => {
  if (error) {
    return { error: ensureError(error), data: null };
  }

  return { error: null, data };
};
