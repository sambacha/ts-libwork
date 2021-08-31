import { expect } from "chai";
import { replacePath, replace } from "../RegexTools";
// import "mocha";

class SubClass {
  prop1 = "ValueOfProp1"
  prop2 = "ValueOfProp2"
}

class BaseClass {
  basprop: string;
}

class MyClass extends BaseClass {
  z = "valueOfZ";

  subClass: SubClass = new SubClass();


  async B() {
    console.log(this);
  }
  async A() {
    console.log(this);
  }

  async C() {
    console.log(this);
  }
}

describe("RegexTools", () => {

  it("replace without placeholder", () => {
    const myClass = new MyClass();
    const source = "my text without placeholder";
    const target = replace(source, myClass);
    expect(target).to.equal("my text without placeholder");
  });

  // Indexed: const str = RegexTools.replace('{1} {0}', 'tool', 'Nice'};
  it("replace with one Indexed placeholder", () => {
    const target = replace("{1} {0}", "tool");
    expect(target).to.equal("{1} tool");
  });

  it("replace with two Indexed placeholder", () => {
    const target = replace("{1} {0}", "tool", "Nice");
    expect(target).to.equal("Nice tool");
  });

  it("replace with one Object placeholder", () => {
    const target = replace("{a} {b}", { b: "tool" });
    expect(target).to.equal("{a} tool");
  });

  it("replace with two Object placeholder", () => {
    const target = replace("{a} {b}", { b: "tool", a: "Nice" });
    expect(target).to.equal("Nice tool");
  });

  it("replacePath with two placeholder", () => {
    const myClass = new MyClass();
    const source = "my text with {subClass.prop1} and {z}";
    const target = replacePath(source, myClass);
    expect(target).to.equal("my text with ValueOfProp1 and valueOfZ");
  });

  it("replacePath without placeholder", () => {
    const myClass = new MyClass();
    const source = "my text without placeholder";
    const target = replacePath(source, myClass);
    expect(target).to.equal("my text without placeholder");
  });

  it("replacePath with one placeholder", () => {
    const myClass = new MyClass();
    const source = "my text with {subClass.prop1}";
    const target = replacePath(source, myClass);
    expect(target).to.equal("my text with ValueOfProp1");

  });

  it("replacePath with two placeholder", () => {
    const myClass = new MyClass();
    const source = "my text with {subClass.prop1} and {z}";
    const target = replacePath(source, myClass);
    expect(target).to.equal("my text with ValueOfProp1 and valueOfZ");
  });

});
