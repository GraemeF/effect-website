import { Effect, Schedule } from "effect"

let count = 0

// Define an async effect that simulates an action with possible failures
const action = Effect.async<string, Error>((resume) => {
  if (count > 1) {
    console.log("failure")
    resume(Effect.fail(new Error()))
  } else {
    count++
    console.log("success")
    resume(Effect.succeed("yay!"))
  }
})

const policy = Schedule.addDelay(
  Schedule.recurs(2), // Repeat for a maximum of 2 times
  () => "100 millis" // Add a delay of 100 milliseconds between repetitions
)

const program = Effect.repeatOrElse(action, policy, () =>
  Effect.sync(() => {
    console.log("orElse")
    return count - 1
  })
)

Effect.runPromise(program).then((n) => console.log(`repetitions: ${n}`))
/*
Output:
success
success
failure
orElse
repetitions: 1
*/
