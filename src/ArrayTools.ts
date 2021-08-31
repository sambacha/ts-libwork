/* eslint-disable @typescript-eslint/no-namespace */
export namespace ArrayTools {

  // Adds the element at a specific position inside the linked list
  export function insert<T>(arr: T[], val: T | T[], previousItem?: T): void {
    const indexOfParent = previousItem === undefined ? -1 : arr.indexOf(previousItem);

    if (val instanceof Array) {
      // Array
      if (indexOfParent > -1) {
        arr.splice(indexOfParent + 1, 0, ...val);
      } else {
        arr.push(...val);
      }
    } else {
      // one item
      if (indexOfParent > -1) {
        arr.splice(indexOfParent + 1, 0, val);
      } else {
        arr.push(val);
      }
    }
  }

  export function getArray<T>(value: T | T[] | undefined): T[] {
    if (Array.isArray(value)) {
      return value;
    }
    return value === undefined ? [] : [value];
  }

  export function shuffle<T>(array: T[]): T[] {
    let counter = array.length;

    // While there are elements in the array
    while (counter > 0) {
      // Pick a random index
      const index = Math.floor(Math.random() * counter);

      // Decrease counter by 1
      counter--;

      // And swap the last element with it
      const temp = array[counter];
      array[counter] = array[index];
      array[index] = temp;
    }

    return array;
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  export function getUniqueRandomKeys(array: any[], count: number): string[] {
    const f = Object.getOwnPropertyNames(array);
    const result: string[] = [];

    while (result.length < count) {

      const key = f[Math.floor(Math.random() * f.length)];

      if (!result.find(item => item === key)) {
        result.push(key);
      }
    }

    return result;
  }

  export function getUniqueRandomValues<T>(array: T[], count: number): T[] {
    const result: T[] = [];
    const arrayLength = array.length;

    while (result.length < count) {

      const element = array[Math.floor(Math.random() * arrayLength)];

      if (!result.find(item => item === element)) {
        result.push(element);
      }
    }

    return result;
  }

  export function getRandomValue<T>(array: T[]): T {
    return array[Math.floor(Math.random() * array.length)];
  }

}
