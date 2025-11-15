type LastReturnType<Fns extends unknown[]> = Fns extends [
  ...unknown[],
  infer Last extends (arg: never) => unknown,
]
  ? ReturnType<Last>
  : never;

type ValidatePipeArgs<Input, Fns extends unknown[]> = Fns extends [
  (arg: infer FnInput) => infer FnOutput,
  ...infer Rest,
]
  ? Input extends FnInput
    ? [(arg: FnInput) => FnOutput, ...ValidatePipeArgs<FnOutput, Rest>]
    : never
  : [];

export function pipe<T, Fns extends [(arg: T) => unknown, ...unknown[]]>(
  input: T,
  ...fns: Fns & ValidatePipeArgs<T, Fns>
): LastReturnType<Fns> {
  return fns.reduce(
    (acc, fn) => (fn as (arg: unknown) => unknown)(acc),
    input,
  ) as LastReturnType<Fns>;
}
