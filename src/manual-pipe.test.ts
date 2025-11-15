import { it, describe, expect, expectTypeOf } from "vitest";
import { pipe } from "./manual-pipe.ts";

describe("manual pipe", () => {
  it("pipe", () => {
    const f = (n: number): number => n + 1;
    const g = (n: number): number => n * 2;

    expect(pipe(2, f)).toBe(3);
    expectTypeOf(pipe(2, f)).toBeNumber();
    expect(pipe(2, f, g)).toBe(6);
    expectTypeOf(pipe(2, f, g)).toBeNumber();
    expect(pipe(2, f, g, f)).toBe(7);
    expectTypeOf(pipe(2, f, g, f)).toBeNumber();
    expect(pipe(2, f, g, f, g)).toBe(14);
    expectTypeOf(pipe(2, f, g, f, g)).toBeNumber();
    expect(pipe(2, f, g, f, g, f)).toBe(15);
    expectTypeOf(pipe(2, f, g, f, g, f)).toBeNumber();
    expect(pipe(2, f, g, f, g, f, g)).toBe(30);
    expectTypeOf(pipe(2, f, g, f, g, f, g)).toBeNumber();
    expect(pipe(2, f, g, f, g, f, g, f)).toBe(31);
    expectTypeOf(pipe(2, f, g, f, g, f, g, f)).toBeNumber();
    expect(pipe(2, f, g, f, g, f, g, f, g)).toBe(62);
    expectTypeOf(pipe(2, f, g, f, g, f, g, f, g)).toBeNumber();
    expect(pipe(2, f, g, f, g, f, g, f, g, f)).toBe(63);
    expectTypeOf(pipe(2, f, g, f, g, f, g, f, g, f)).toBeNumber();
    expect(pipe(2, f, g, f, g, f, g, f, g, f, g)).toBe(126);
    expectTypeOf(pipe(2, f, g, f, g, f, g, f, g, f, g)).toBeNumber();
    expect(pipe(2, f, g, f, g, f, g, f, g, f, g, f)).toBe(127);
    expectTypeOf(pipe(2, f, g, f, g, f, g, f, g, f, g, f)).toBeNumber();
    expect(pipe(2, f, g, f, g, f, g, f, g, f, g, f, g)).toBe(254);
    expectTypeOf(pipe(2, f, g, f, g, f, g, f, g, f, g, f, g)).toBeNumber();
    expect(pipe(2, f, g, f, g, f, g, f, g, f, g, f, g, f)).toBe(255);
    expectTypeOf(pipe(2, f, g, f, g, f, g, f, g, f, g, f, g, f)).toBeNumber();
    expect(pipe(2, f, g, f, g, f, g, f, g, f, g, f, g, f, g)).toBe(510);
    expectTypeOf(
      pipe(2, f, g, f, g, f, g, f, g, f, g, f, g, f, g),
    ).toBeNumber();
    expect(pipe(2, f, g, f, g, f, g, f, g, f, g, f, g, f, g, f)).toBe(511);
  });

  it("should type check the arguments", () => {
    const double = (n: number) => n * 2;
    const isEven = (n: number) => n % 2 === 0;
    const toMessage = (b: boolean) => (b ? "even" : "odd");

    expect(pipe(2, double, isEven, toMessage)).toBe("even");
    expectTypeOf(pipe(2, double, isEven, toMessage)).toBeString();

    // @ts-expect-error - string is not a number
    pipe("test", double, isEven, toMessage);

    // @ts-expect-error - boolean is not a number
    pipe(true, double, isEven, toMessage);

    // @ts-expect-error - null is not a number
    pipe(null, double, isEven, toMessage);

    // @ts-expect-error - undefined is not a number
    pipe(undefined, double, isEven, toMessage);
  });

  it("should return the correct type", () => {
    const message = (n: number) => `number: ${n}`;
    const isEven = (n: number) => n % 2 === 0;

    // @ts-expect-error - message returns a string, but isEven expects a number, so the types do not match
    pipe(2, message, isEven);
  });
});
