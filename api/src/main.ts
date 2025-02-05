import * as DevTools from "@effect/experimental/DevTools"
import { faker } from "@faker-js/faker"
import { api } from "api/api.js"
import { Effect, Layer, pipe } from "effect-app"
import { setFaker } from "effect-app/faker"
import { MergedConfig } from "./config.js"
import { runMain } from "./lib/basicRuntime.js"
import { TracingLive } from "./observability.js"

setFaker(faker)
const logConfig = pipe(
  MergedConfig,
  Effect.andThen((cfg) => console.debug(`Config: ${JSON.stringify(cfg, undefined, 2)}`))
)

const program = api
  .pipe(
    Layer.provide(logConfig.pipe(Layer.scopedDiscard)),
    Layer.provide(process.env["DT"] ? DevTools.layer() : Layer.empty),
    Layer.provideMerge(TracingLive)
  )

// NOTE: all dependencies should have been provided, for us to be able to run the program.
// if you get a type error here on the R argument, you haven't provided that dependency yet, or not at the appropriate time / location
runMain(Layer.launch(program))
