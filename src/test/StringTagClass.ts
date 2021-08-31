export class WithStringTag {
  get [Symbol.toStringTag]() {
    return "WithStringTag";
  }

  a: string;
}

export class WithoutStringTag {
  a: string;
}
