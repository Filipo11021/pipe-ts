type PipeFn<Input, Output> = (arg: Input) => Output;

type LastReturnType<Fns extends unknown[]> = Fns extends [
  ...unknown[],
  infer Last extends PipeFn<never, unknown>,
]
  ? ReturnType<Last>
  : never;

type ParsePipeFns<Input, Fns extends unknown[]> = Fns extends [
  PipeFn<infer FnInput, infer FnOutput>,
  ...infer Rest,
]
  ? [Input] extends [FnInput]
    ? [PipeFn<FnInput, FnOutput>, ...ParsePipeFns<FnOutput, Rest>]
    : never
  : Fns;

export function pipe<
  Input,
  Fns extends [PipeFn<Input, unknown>, ...PipeFn<any, any>[]],
>(input: Input, ...fns: ParsePipeFns<Input, Fns>): LastReturnType<Fns> {
  return fns.reduce((acc, fn) => fn(acc), input) as LastReturnType<Fns>;
}
