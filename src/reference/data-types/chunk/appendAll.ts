import { Chunk } from "effect"

// $ExpectType NonEmptyChunk<string | number>
const concatenatedChunk = Chunk.appendAll(
  Chunk.make(1, 2),
  Chunk.make("a", "b")
)

console.log(concatenatedChunk)
/*
Output:
{
  _id: "Chunk",
  values: [ 1, 2, "a", "b" ]
}
*/
