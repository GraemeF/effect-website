import { Effect, Either } from "effect"
import { program } from "./error-tracking"

// $ExpectType Effect<string, never, never>
const recovered = Effect.gen(function* (_) {
  const failureOrSuccess = yield* _(Effect.either(program))
  return Either.match(failureOrSuccess, {
    onLeft: (error) => `Recovering from ${error._tag}`,
    onRight: (value) => value // do nothing in case of success
  })
})
