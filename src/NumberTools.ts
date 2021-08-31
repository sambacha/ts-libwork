/* eslint-disable @typescript-eslint/no-namespace */
export namespace NumberTools {
  export function random(max: number, min: number = 0): number {
    return Math.floor(min + Math.random() * (max + 1 - min));
  }
}
