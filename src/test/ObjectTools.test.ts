import { expect } from "chai";
import { ObjectTools } from "../ObjectTools";
import { WithStringTag } from "./StringTagClass";

class Props { a: string | null = null; b: string = "b"; c: string = "c"; }
class DeepProps {
  a: string = "a";
  b: string = "b";
  c: Props = { a: "ca", b: "cb", c: "cc" };
  d: Props[] = [
    { a: "da1", b: "db1", c: "dc1" },
    { a: "da2", b: "db2", c: "dc2" }
  ]
}

class SubClass {
  prop1 = "ValueOfProp1"
}

class BaseClass {
  basprop: string;
  // async Stop() {

  // }
}

class MyClass extends BaseClass {
  z = "valueOfZ";

  subClass: SubClass = new SubClass();

  private x = "x";

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

describe("ObjectTools", () => {

  it("GetMethodNames", () => {
    const myClass = new MyClass();

    const names = ObjectTools.GetMethodNames(myClass, "C");

    expect(names.length).to.equal(2);

    expect(names[1])
      .to.equal("A");

  });

  it("GetByPath", () => {
    const myClass = new MyClass();

    const value = ObjectTools.get(myClass, "z");
    expect(value).to.equal("valueOfZ");

    const deepValue = ObjectTools.get(myClass, "subClass.prop1");
    expect(deepValue).to.equal("ValueOfProp1");

    const deepValueUNdef = ObjectTools.get(myClass, "subClass.de.prop1");
    expect(deepValueUNdef).to.equal(undefined);

  });

  it("isInstanceOf", () => {
    const a = new WithStringTag();

    const result = ObjectTools.isInstanceOf(a, WithStringTag);
    expect(result).be.true;
  });

  it("GetOwnMethodNames", () => {
    const myClass = new MyClass();

    const names = ObjectTools.GetOwnMethodNames(myClass, "B");

    expect(names.length).to.equal(2);

    expect(names[0]).to.equal("A");

    expect(names[1]).to.equal("C");

  });

  type Person = { id: string; firstName: string; lastName: string; age: number }

  const array: Person[] = [
    { id: "a", firstName: "John", lastName: "Smith", age: 27 },
    { id: "b", firstName: "Bill", lastName: "Brown", age: 53 }
  ];

  it("CopyNullProps", () => {
    const props = new Props();

    const copy = ObjectTools.CopyNullProps(props, "a", "c");

    expect(copy.a).to.equal(props.a);
    expect((copy as any).b).to.be.undefined;
    expect(copy.c).to.equal("c");
  });

  it("CopyProps", () => {
    const props = new Props();

    const copy = ObjectTools.CopyProps(props, "a", "c");

    expect(copy.a).to.be.undefined;
    expect((copy as any).b).to.be.undefined;
    expect(copy.c).to.equal("c");
  });

  it("OmitProps", () => {
    const props = { a: null, b: "b", c: "c" };

    const copy = ObjectTools.OmitProps(props, "b");

    expect(copy.a).to.be.undefined; // because null and undefined are omitted from copy
    expect((copy as any).b).to.be.undefined;
    expect(copy.c).to.equal(props.c);
  });

  it("DeepMerge", () => {
    const source = new DeepProps();
    const target = ObjectTools.OmitProps(source, "d");

    ObjectTools.DeepMerge(source, target);

    expect(ObjectTools.DeepEquals(source, target)).to.be.true;
    // expect(copy.a).to.equal("a");
    // expect((copy as any).b).to.be.undefined;
    // expect(copy.c).to.equal("c");
  });

});
