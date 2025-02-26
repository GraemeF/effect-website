import { Effect } from "effect"

const task1 = Effect.gen(function* (_) {
  yield* _(Effect.sleep("2 seconds"))
  yield* _(Effect.logDebug("task1 done"))
})

const task2 = Effect.gen(function* (_) {
  yield* _(Effect.sleep("1 seconds"))
  yield* _(Effect.logDebug("task2 done"))
})

export const program = Effect.gen(function* (_) {
  yield* _(Effect.log("start"))
  yield* _(task1)
  yield* _(task2)
  yield* _(Effect.log("done"))
})
