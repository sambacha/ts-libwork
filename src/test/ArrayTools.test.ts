/* eslint-disable @typescript-eslint/no-explicit-any */
import { expect } from "chai";
import { ArrayTools } from "../ArrayTools";
import "mocha";

describe("ArrayTools", () => {

  it("should get keys of 3 elements from array", () => {
    const arr: any[] = [];

    arr.push(1);
    arr.push("2");
    arr.push({ item: "value" });
    arr.push("4");
    arr.push("5");

    const keys = ArrayTools.getUniqueRandomKeys(arr, 2);

    expect(keys.length)
      .to.equal(2);

    keys.forEach(key => {
      expect(arr[key as any])
        .to.be.not.undefined;
    });
  });

  it("should get values of 3 elements from array", () => {
    const arr: any[] = [];

    arr.push(1);
    arr.push("2");
    arr.push({ item: "value" });
    arr.push("4");
    arr.push("5");

    const values = ArrayTools.getUniqueRandomValues(arr, 2);

    expect(values.length)
      .to.equal(2);

    values.forEach(value => {
      expect(arr.indexOf(value) > -1)
        .to.be.true;
    });
  });

  it("should insert between 1 and 3", () => {
    const arr: number[] = [];

    arr.push(1);
    arr.push(2);
    arr.push(3);

    ArrayTools.insert(arr, 11, 1);

    expect(arr[1])
      .to.equal(11);
  });

  it("should shoufle array", () => {
    const arr: number[] = [];

    arr.push(1);
    arr.push(2);
    arr.push(3);
    arr.push(4);
    arr.push(5);

    const shuffled = ArrayTools.shuffle(arr);

    expect(shuffled.length)
      .to.equal(arr.length);

    shuffled.forEach(item => {
      expect(arr.indexOf(item) > -1)
        .to.be.true;

    });
  });


  it("should return array", () => {
    const arr: number[] = [1, 2, 3];

    const withArray = ArrayTools.getArray(arr);

    expect(withArray.length)
      .to.equal(arr.length);

    expect(withArray[0])
      .to.equal(1);

    const withNumber = ArrayTools.getArray(7);

    expect(withNumber.length)
      .to.equal(1);

    expect(withNumber[0])
      .to.equal(7);

    const withUndefined = ArrayTools.getArray(undefined);

    expect(withUndefined.length)
      .to.equal(0);

  });

});
