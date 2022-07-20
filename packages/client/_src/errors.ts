import type { ParsedShapeOf } from "@effect-ts-app/boilerplate-prelude/schema"
import {
  array,
  literal,
  Model,
  named,
  prop,
  string,
  union,
  unknown,
  useClassNameForSchema,
  withDefaults
} from "@effect-ts-app/boilerplate-prelude/schema"

@useClassNameForSchema
export class NotFoundError extends Model<NotFoundError>()({
  _tag: prop(literal("NotFoundError")),
  message: prop(string)
}) {}

@useClassNameForSchema
export class InvalidStateError extends Model<InvalidStateError>()({
  _tag: prop(literal("InvalidStateError")),
  message: prop(string)
}) {}

@useClassNameForSchema
export class ValidationError extends Model<ValidationError>()({
  _tag: prop(literal("ValidationError")),
  errors: prop(array(unknown)) // meh
}) {}

@useClassNameForSchema
export class NotLoggedInError extends Model<NotLoggedInError>()({
  _tag: prop(literal("NotLoggedInError"))
}) {}

@useClassNameForSchema
export class UnauthorizedError extends Model<UnauthorizedError>()({
  _tag: prop(literal("UnauthorizedError"))
}) {}

@useClassNameForSchema
export class OptimisticConcurrencyException extends Model<OptimisticConcurrencyException>()(
  {
    _tag: prop(literal("OptimisticConcurrencyException"))
  }
) {}

const MutationOnlyErrors = {
  InvalidStateError,
  OptimisticConcurrencyException
}

const GeneralErrors = {
  NotFoundError,
  NotLoggedInError,
  UnauthorizedError,
  ValidationError
}

export const SupportedErrors = union({
  ...MutationOnlyErrors,
  ...GeneralErrors
})
  ["|>"](named("SupportedErrors"))
  ["|>"](withDefaults)
export type SupportedErrors = ParsedShapeOf<typeof SupportedErrors>

// ideal?
// export const QueryErrors = union({ ...GeneralErrors })
//   ["|>"](named("QueryErrors"))
//   ["|>"](withDefaults)
// export type QueryErrors = ParsedShapeOf<typeof QueryErrors>
// export const MutationErrors = union({ ...GeneralErrors, ...GeneralErrors })
//   ["|>"](named("MutationErrors"))
//   ["|>"](withDefaults)

// export type MutationErrors = ParsedShapeOf<typeof MutationErrors>

export const MutationErrors = SupportedErrors
export const QueryErrors = SupportedErrors
export type MutationErrors = ParsedShapeOf<typeof MutationErrors>
export type QueryErrors = ParsedShapeOf<typeof QueryErrors>
