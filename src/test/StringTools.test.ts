import { expect } from "chai";
import { StringTools } from "../StringTools";

describe("StringTools", () => {

  it("should replace two placeholder", () => {
    const template = "Spieler {0} heißt {1}";
    const objectTemplate = "Spieler {PlayerNumber} heißt {Spieler}";

    let result = StringTools.format(template, "1", "Peter");

    expect(result)
      .to.equal("Spieler 1 heißt Peter");

    result = StringTools.format(template, 1, "Peter");

    expect(result)
      .to.equal("Spieler 1 heißt Peter");

    result = StringTools.format(objectTemplate, { Spieler: "Peter", PlayerNumber: 1 });

    expect(result)
      .to.equal("Spieler 1 heißt Peter");

  });

});
